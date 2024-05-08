import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DBModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DBModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'some-secret-key',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
