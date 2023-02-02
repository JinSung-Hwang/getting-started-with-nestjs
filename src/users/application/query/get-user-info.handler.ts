import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infra/db/entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserInfoQuery } from './get-user-info.query';
import { NotFoundException } from '@nestjs/common';
import { UserInfo } from '../../interface/dto/user-info.dto';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoQueryHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(@InjectRepository(UserEntity) private UsersRepository: Repository<UserEntity>) {}

  async execute(query: GetUserInfoQuery): Promise<UserInfo> {
    const { userId } = query;
    const user = await this.UsersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
