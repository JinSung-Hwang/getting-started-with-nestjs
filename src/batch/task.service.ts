import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob(); // note: TaskService가 초기화 되면서 cronSample을 등록시킴
  }

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob('* * * * * *', () => {
      this.logger.warn(`run! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job); // note: 등록만 시켜두는것인지 실행시키는 것은 아님
    this.logger.warn(`job ${name} added!`);
  }

  // note: 매시간 3초일떄 실행
  @Cron('3 * * * * *', { name: 'cronTask!' })
  handleCron() {
    this.logger.log('Task Called handelCron');
  }

  // note: 3초 간격으로 실행
  @Interval('intervalTask', 3000)
  handleInterval() {
    this.logger.log('Task Called Interval');
  }

  // note: 3초후에 실행되고 종료
  @Timeout('timeoutTask', 3000)
  handleTimeout() {
    this.logger.log('Task Called Timeout');
  }
}
