import { UserCreatedEvent } from './user-created.event';
import { TestEvent } from './test.event';
import { EmailService } from '../../email/email.service';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';

// note: 여기는 유저 이벤트를 받아서 로직을 처리하는 handler이다.
@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventHandler implements IEventHandler<UserCreatedEvent | TestEvent> {
  constructor(private emailService: EmailService) {}

  async handle(event: UserCreatedEvent | TestEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
        break;
      }
      case TestEvent.name: {
        console.log('TestEvent!');
        break;
      }
      default: {
        break;
      }
    }
  }
}
