import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello() {
    this.logger.error('level: error');
    this.logger.warn('level: warn');
    this.logger.log('level: log');
    this.logger.verbose('level: verbose');
    this.logger.debug('level: debug');

    return 'hi';
  }
}
