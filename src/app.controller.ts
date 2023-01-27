import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    this.logger.error('level: error');
    this.logger.warn('level: warn');
    this.logger.log('level: log');
    this.logger.verbose('level: verbose');
    this.logger.debug('level: debug');

    return this.configService.get('DATABASE_HOST');
  }
}
