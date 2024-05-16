import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DBModule],
  exports: [CategoryService],
})
export class CategoryModule {}
