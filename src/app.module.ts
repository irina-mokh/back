import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DBModule } from './db/db.module';
import { CategoryModule } from './category/category.module';
import { ActionModule } from './action/action.module';

@Module({
  imports: [UserModule, AuthModule, DBModule, CategoryModule, ActionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
