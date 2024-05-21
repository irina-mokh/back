import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from 'src/logger/logger.service';
import { CreateUserDto, UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

const REFRESH_SECRET = process.env.JWT_SECRET_REFRESH_KEY || 'refresh';
const REFRESH_EXPIRES = process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

@Injectable()
export class AuthService {
  logger: LoggingService;
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {
    this.logger = new LoggingService();
    this.logger.setContext('authService');
  }

  async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async login(user: UserDto) {
    const { id, email } = user;
    return {
      ...this.getTokens({ userId: id, login: email }),
      user: await this.userService.getByEmail(email),
    };
  }

  async validUser({ email, password }: CreateUserDto) {
    const user = await this.userService.getByEmail(email);
    const validPass = await bcrypt.compare(password, user.password);
    if (user && validPass) {
      return user;
    }
  }

  getTokens(payload: { userId: string; login: string }) {
    return {
      accessToken: this.jwt.sign(payload),
      refreshToken: this.jwt.sign(payload, {
        expiresIn: REFRESH_EXPIRES,
        secret: REFRESH_SECRET,
      }),
    };
  }

  validRefresh(refresh: string) {
    const { userId, login } = this.jwt.verify(refresh, {
      secret: REFRESH_SECRET,
    });
    return { userId, login } || null;
  }
}
