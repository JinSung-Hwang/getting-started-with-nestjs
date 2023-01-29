import { Controller, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('batches')
export class BatchController {
  constructor(private scheduler: SchedulerRegistry) {}

  @Post('/start-sample')
  start() {
    const job = this.scheduler.getCronJob('cronSample'); // note: API호출을 통해서 TaskService에서 등록해두었던 cronSample을 실행시킴
    job.start();
    console.log('start!!', job.lastDate());
  }

  @Post('/stop-sample')
  stop() {
    const job = this.scheduler.getCronJob('cronSample');
    job.stop();
    console.log('stoped!!', job.lastDate());
  }
}
