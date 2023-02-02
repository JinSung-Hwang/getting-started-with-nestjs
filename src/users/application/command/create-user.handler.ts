import { Injectable, UnprocessableEntityException, Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { UserFactory } from '../../domain/user.factory';
import { IUserRepository } from '../../domain/repository/iuser.repository';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userFactory: UserFactory, @Inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { name, email, password } = command;

    const userExist = await this.userRepository.findByEmail(email);
    if (!userExist) {
      throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
    }

    const id = ulid();
    const signupVerifyToken = uuid.v1();

    // xxx: userFactory를 통해서 만들어진 유저 객체를 userRepository에 넣어야한다고 생각되는데 그렇게하지 않는다.
    // xxx: 아마 이렇게 한 이유는 userFactory.create함수에서 userCreatedEvent가 발생되는데 그 이벤트를 타고 emailService가 호출되고 email이 유저에게 전송된다.
    // xxx: 만약 email이 전송되고 DB에 데이터를 넣다가 오류가 나면 email만 전달되는 문제가 발생할 수 도 있어서 userRepository를 호출하고 userFactory로 객체를 만든거같다.
    // xxx: 저자의 의도는 알겠지만 ddd는 아니지 않나 싶긴하다.
    await this.userRepository.save(id, name, email, password, signupVerifyToken);
    this.userFactory.create(id, name, email, password, signupVerifyToken);
  }
}
