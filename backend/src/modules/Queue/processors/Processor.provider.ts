import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { ScrapperQueueName } from '@notifier/types';

@Processor(ScrapperQueueName)
export class ScrapProcessor {
  private readonly logger = new Logger(ScrapProcessor.name);

  @Process()
  async scrap(job: Job<unknown>) {
    this.logger.log('procesed job ', job);
    return { reults: 'yeah' };
  };

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.warn('Job results');
    console.log(job.data);
  };

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
};
