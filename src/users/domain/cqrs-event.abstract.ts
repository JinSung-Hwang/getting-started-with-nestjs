// note: user-events.handler에서 보면 이벤트 이름으로 분기하여 로직을 처리하고 있다.
// note: 하여 각 이벤트가 만들어질떄 이벤트 이름을 넣도록 만들기 위해서 추상 클래스를 만들었다.
export abstract class CqrsEvent {
  constructor(readonly name: string) {}
}
