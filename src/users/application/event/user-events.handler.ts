import { UserCreatedEvent } from '../../domain/user-created.event';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { IEmailService } from '../adapter/iemail.service';
import { Inject } from '@nestjs/common';

// note: 여기는 유저 이벤트를 받아서 로직을 처리하는 handler이다.
@EventsHandler(UserCreatedEvent)
export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
  constructor(@Inject('EmailService') private emailService: IEmailService) {}

  async handle(event: UserCreatedEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
        break;
      }
      default: {
        break;
      }
    }
  }
}
