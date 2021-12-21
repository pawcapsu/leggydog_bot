import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';

@Injectable()
export class DeleteMeCallback implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef
  ) {}
  
  // Registering callback
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(DeleteMeCallback));
  }

  // Callback-related
  public pattern = /delete-me/;

  public async run(ctx: Context) {
    ctx.deleteMessage();
  };
};