import { Injectable } from '@nestjs/common';
import { SubscriberService } from 'src/modules/Subscribers/services';

@Injectable()
export class SubscriberListService {
  constructor(
    private readonly service: SubscriberService,
  ) {}
  
  // public messageBuilder
};