import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from './cqrs-event.abstract';

export class TestEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(TestEvent.name);
  }
}
