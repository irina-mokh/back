import { Injectable } from '@nestjs/common';
import { CreateCatDto as C } from './category.dto';
import { DBService } from 'src/db/db.service';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class CategoryService {
  logger: LoggingService;
  constructor(readonly db: DBService) {
    this.logger = new LoggingService();
    this.logger.setContext('categoryService');
  }

  async getAll(userId: string) {
    return await this.db.category.findMany({ where: { userId } });
  }

  async getById(id: string) {
    return await this.db.category.findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    this.logger.log(`Create category with data: ${JSON.stringify(dto)}`);
    const item = await this.db.category.create({
      data: {
        ...dto,
      },
    });
    return {
      ...item,
    };
  }

  async delete(id: string) {
    this.logger.log(`Delete by id ${id}`);
    await this.db.category.delete({ where: { id } });
  }
}
