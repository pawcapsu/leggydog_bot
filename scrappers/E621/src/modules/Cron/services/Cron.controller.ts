import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScrapperService } from 'src/modules/Scrapper/services';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly scrapperService: ScrapperService,
  ) {}

  private readonly logger = new Logger(SubscriberService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async handleCron() {
    this.logger.debug(`Handle cron (isWorking: ${this.scrapperService.working})`);
    if (!this.scrapperService.working) {
      await this.scrapperService.process();
    };
  };
};