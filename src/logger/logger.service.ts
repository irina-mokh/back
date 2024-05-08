import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
  }

  log(msg: string): void {
    super.log(`${msg}`);
  }

  error(msg: string, err: any): void {
    super.error(`${msg} | code:  ${err.statusCode}`);
  }
}
