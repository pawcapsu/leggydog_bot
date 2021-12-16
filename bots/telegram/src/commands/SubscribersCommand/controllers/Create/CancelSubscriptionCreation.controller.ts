import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { SubscribersMenuService } from 'src/commands/SubscribersCommand/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';
import { ChannelService } from 'src/modules/Channel/services';
import { CacheService } from 'src/modules/SimpleCache/services';

// Callback
@Injectable()
export class CancelSubscriberCreationController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    
    private readonly cache: CacheService,
    private readonly service: SubscribersMenuService,
    private readonly channelService: ChannelService,  
  ) {}
  
  // Registering callback
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(CancelSubscriberCreationController));
  };

  // Callback-related
  public pattern = /cancelSubscriberCreation/;

  public async run(ctx: Context) {
    const chat_id = String(ctx.update?.callback_query?.from.id);
    const message = await this.service.messageBuilder(chat_id);
    
    // Updating channel state
    // Do we even need this anymore?
    // await this.channelService.update(String(ctx.update?.callback_query?.from.id), { action: { type: 'NONE' } });
    
    // Updating cached value
    this.cache.set(`channel-isCreatingNewSubscriber-${chat_id}`, false);

    ctx.editMessageText(message.text, message.options);
    // +todo
    // ctx.reply(message.text, message.options);
  };
};