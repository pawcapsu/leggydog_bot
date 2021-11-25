import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { LanguagesConfigService } from '../services';

@Injectable()
export class LanguagesFetcher implements OnApplicationBootstrap {
  private logger = new Logger(LanguagesFetcher.name);
  
  constructor(
    private readonly service: LanguagesConfigService,
  ) {}

  onApplicationBootstrap() {
    setInterval(() => {
      this.service.fetchLanguages();
    }, 5000);
  };
};