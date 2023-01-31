import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/create-user.handler';
import { UserEventHandler } from './event/user-events.handler';
import { GetUserInfoQueryHandler } from './query/get-user-info.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule, AuthModule, CqrsModule],
  controllers: [UsersController],
  providers: [UsersService, Logger, CreateUserHandler, UserEventHandler, GetUserInfoQueryHandler],
})
export class UsersModule {}
