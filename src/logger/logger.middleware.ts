import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly ls: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    this.ls.log(
      `REQ: ${method} | url=${originalUrl} | query=${JSON.stringify(
        query,
      )} | body=${JSON.stringify(body)}`,
    );
    this.ls.log(`RES: status=${res.statusCode}`);
    next();
  }
}
