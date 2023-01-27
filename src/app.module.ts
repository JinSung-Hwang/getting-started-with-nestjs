import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import authConfig from 'src/config/authConfig';
import { AppService } from './app.service';
import { WinstonModule, utilities as nestjsWinstonModuleUtilities } from 'nest-winston';
import { LoggerModule } from './logger/logger.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }),
    WinstonModule.forRoot({
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
    LoggerModule,
    UsersModule,
    EmailModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
