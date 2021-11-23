import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { MenuCommandService } from 'src/commands/MenuCommand/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';

// Callback
@Injectable()
export class CancelSubscriberCreationController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: MenuCommandService,
  ) {}
  
  // Registering callback
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(CancelSubscriberCreationController));
  };

  // Callback-related
  public pattern = /cancelSubscriberCreation/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from?.id));
    
    // Updating ChannelState

    ctx.editMessageText(message.text, message.options);
    // +todo
    // ctx.reply(message.text, message.options);
  };
};