import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repository/iuser.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserFactory } from '../../../domain/user.factory';
import { User } from '../../../domain/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private userFactory: UserFactory,
    private dataSource: DataSource,
  ) {}
  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!userEntity) {
      return null;
    }
    const { id, name, signupVerifyToken, password } = userEntity;

    return this.userFactory.reconstitute(id, name, email, signupVerifyToken, password);
  }

  async save(id: string, name: string, email: string, password: string, signupVerifyToken: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const user = { id, name, email, password, signupVerifyToken };

      await manager.save(UserEntity, user);
    });
  }
}
