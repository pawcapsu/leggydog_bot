import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScrapperService } from 'src/modules/Scrapper/services';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly scrapperService: ScrapperService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async handleCron() {
    if (!this.scrapperService.working) {
      try {
        await this.scrapperService.process();
      } catch(error) {
        console.log('error while scrapping:');
        console.log(error);
      };
    };
  };
};