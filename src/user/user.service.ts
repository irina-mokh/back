import { Injectable } from '@nestjs/common';
import { CreateUserDto as C, UserDto as T } from './user.dto';
import { DBService } from 'src/db/db.service';
import { LoggingService } from 'src/logger/logger.service';
import { hash } from 'src/auth/helpers';

const omitPass = {
  id: true,
  email: true,
};

@Injectable()
export class UserService {
  logger: LoggingService;
  constructor(readonly db: DBService) {
    this.logger = new LoggingService();
    this.logger.setContext('userService');
  }

  hidePass(user: T) {
    const clone = { ...user };
    delete clone.password;
    return clone;
  }

  async getAll() {
    this.logger.log(`Get all users`);
    return await this.db.user.findMany({
      select: omitPass,
    });
  }

  async getById(id: string) {
    this.logger.log(`Get user by id ${id}`);
    return await this.db.user.findUnique({
      where: { id },
      select: omitPass,
    });
  }

  async create(dto: C) {
    this.logger.log(`Create user with data: ${JSON.stringify(dto)}`);
    const user = await this.db.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      },
      select: omitPass,
    });
    return {
      ...user,
    };
  }

  async updatePass(id: string, newPassword: string) {
    this.logger.log(`Update pass of user by id ${id} with new: ${newPassword}`);
    // const user: T = await this.db.user.findUnique({
    //   where: { id },
    // });

    const updUser = await this.db.user.update({
      where: { id },
      data: {
        password: await hash(newPassword),
      },
      select: omitPass,
    });

    return updUser;
  }

  async delete(id: string) {
    this.logger.log(`Delete user by id ${id}`);
    await this.db.user.delete({ where: { id } });
  }

  async getByEmail(email: string) {
    return await this.db.user.findFirst({
      where: { email },
    });
  }
}
