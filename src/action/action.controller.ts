import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ActionService } from './action.service';
import { CreateActDto as C } from './action.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('action')
export class ActionController {
  constructor(private service: ActionService) {}

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    return item;
  }

  async getByCat(@Query('catId', ParseUUIDPipe) id: string) {
    const item = await this.service.getByCatId(id);
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
}
