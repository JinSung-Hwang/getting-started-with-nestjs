import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule, utilities as nestjsWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestjsWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
})();
