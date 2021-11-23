import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';
import { CreateSubscriberService } from 'src/commands/SubscribersCommand/services';

// Callback
@Injectable()
export class CreateSubscriberController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: CreateSubscriberService
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(CreateSubscriberController));
  };

  // Callback-related
  public pattern = /createSubscriber/;

  public async run(ctx: Context) {
    const message = this.service.messageBuilder('CreateNew');

    // Updating ChannelState

    ctx.editMessageText(message.text, message.options);
    // +todo
    // ctx.reply(message.text, message.options)
  };
};