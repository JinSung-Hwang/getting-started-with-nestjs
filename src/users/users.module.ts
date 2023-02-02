import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './interface/users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/db/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/command/create-user.handler';
import { UserEventHandler } from './application/event/user-events.handler';
import { GetUserInfoQueryHandler } from './application/query/get-user-info.handler';
import { UserRepository } from './infra/db/repository/user.repository';
import { EmailService } from '../email/email.service';
import { UserFactory } from './domain/user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule, AuthModule, CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    Logger,
    CreateUserHandler,
    UserEventHandler,
    GetUserInfoQueryHandler,
    UserFactory,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'EmailService',
      useClass: EmailService,
    },
  ],
})
export class UsersModule {}
