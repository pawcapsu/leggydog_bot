import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback, IBotCommand } from 'src/types';
import { SubscribersMenuService } from '../services';

// Command
@Injectable()
export class SubscribersCommandController implements OnApplicationBootstrap, IBotCommand {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly service: SubscribersMenuService,
    private readonly moduleRef: ModuleRef,
  ) {}
  
  onApplicationBootstrap() {
    // Registering command
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(SubscribersCommandController));
  };

  // Command-related
  public pattern = /subscribers/;

  public async run(ctx: Context) {
    const chat_id = ctx.update.message?.from.id;
    const message = await this.service.messageBuilder(String(chat_id));
    ctx.reply(message.text, message.options);
  };
};

// Callback
@Injectable()
export class SubscribersCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: SubscribersMenuService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(SubscribersCallbackController));
  };

  // Callback-related
  public pattern = /openSubscriberMenu/;

  public async run(ctx: Context) {
    const chat_id = ctx.update.callback_query?.from.id
    const message = await this.service.messageBuilder(String(chat_id));
    ctx.editMessageText(message.text, message.options);
    // +todo
    // ctx.reply(message.text, message.options);
  };
};