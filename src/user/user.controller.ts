import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto as C, UpdatePasswordDto as U } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';

export const USER_ID = '1';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    return item;
  }
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    this.service.delete(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body(ValidationPipe) dto: C) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) { oldPassword, newPassword }: U,
  ) {
    const user = await this.service.db.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User is not found.');

    const validPass = await bcrypt.compare(oldPassword, user.password);

    if (!validPass) throw new ForbiddenException('Old password is wrong.');

    return this.service.updatePass(id, newPassword);
  }
}
