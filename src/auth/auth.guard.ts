import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  jwt: JwtService;
  constructor() {
    this.jwt = new JwtService();
  }
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException({ message: 'User is unauthorized.' });
    }
    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY || 'some-secret-key',
      });
      req.user = payload;
    } catch (err) {
      throw new UnauthorizedException({ message: 'User is unauthorized!' });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
