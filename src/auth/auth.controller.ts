import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.service.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    const user = await this.service.validUser(dto);
    if (!user)
      throw new UnauthorizedException({ message: 'Wrong login or password.' });
    return this.service.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken)
      throw new UnauthorizedException({ message: 'No refresh token found' });
    try {
      const payload = this.service.validRefresh(refreshToken);
      return this.service.getTokens(payload);
    } catch {
      throw new ForbiddenException({ message: 'Invalid refresh token' });
    }
  }
}
