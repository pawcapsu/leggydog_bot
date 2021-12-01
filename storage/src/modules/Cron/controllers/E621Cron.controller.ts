import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostsTableService } from 'src/modules/ExternalDatabase/services/E621';

// Exporting E621CronController
@Injectable()
export class E621CronController {
  private readonly logger = new Logger(E621CronController.name);

  constructor(
    // E621-related services
    private readonly postsService: PostsTableService,
  ) {}

  // Database dump cron
  @Cron(CronExpression.EVERY_5_SECONDS)
  public async handleCron() {
    // Updating posts table
    await this.postsService.update();
  };
};