import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BotService } from 'src/services';

@Injectable()
export class BotInstanceService {
  constructor(private readonly moduleRef: ModuleRef) {}

  // public get
  public get() {
    return this.moduleRef.get(BotService).getInstance();
  }
}
