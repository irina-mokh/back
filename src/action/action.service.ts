import { Injectable } from '@nestjs/common';
import { CreateActDto as C } from './action.dto';
import { DBService } from 'src/db/db.service';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class ActionService {
  logger: LoggingService;
  constructor(readonly db: DBService) {
    this.logger = new LoggingService();
    this.logger.setContext('actionService');
  }

  async getByCatId(catId: string) {
    return await this.db.action.findMany({
      where: {
        OR: [{ from: { equals: catId } }, { to: { equals: catId } }],
      },
    });
  }

  async getById(id: string) {
    return await this.db.action.findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    this.logger.log(`Create action with data: ${JSON.stringify(dto)}`);

    const item = await this.db.action.create({
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
    await this.db.action.delete({ where: { id } });
  }
}
