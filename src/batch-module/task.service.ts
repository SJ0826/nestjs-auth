import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private scheduleRegistry: SchedulerRegistry) {
    this.addCronJob(); // TaskService가 실행될 때 크론 잡 하나를 ScheduleRegistry에 추가.
  }

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob('* * * * * *', () => {
      this.logger.warn(`run! ${name}`);
    });

    this.scheduleRegistry.addCronJob(name, job);

    this.logger.warn(`job ${name} added!`);
  }
}
