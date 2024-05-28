import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  imports: [DBModule],
  exports: [ActionService],
})
export class ActionModule {}
