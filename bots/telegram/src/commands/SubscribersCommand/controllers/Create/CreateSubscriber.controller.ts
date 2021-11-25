import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback, IBotCommand } from 'src/types';
import { CreateSubscriberService } from 'src/commands/SubscribersCommand/services';
import { ChannelService } from 'src/modules/Channel/services';
import { CacheService } from 'src/modules/SimpleCache/services';
import { SubscriberService } from 'src/modules/Subscribers/services';

// Callback
@Injectable()
export class CreateSubscriberController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly cache: CacheService,
    private readonly service: CreateSubscriberService,
    private readonly channelService: ChannelService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(CreateSubscriberController));
  };

  // Callback-related
  public pattern = /createSubscriber/;

  public async run(ctx: Context) {
    const chat_id = String(ctx.update?.callback_query?.from.id);
    const message = await this.service.messageBuilder(chat_id, 'CreateNew');
    
    // Updating ChannelState
    // +todo i know what to do this { action: { type: EChannelActionType } } thing-y
    // do we even need this? As for now - no
    // await this.channelService.update(chat_id, { action: { type: 'CREATE_SUBSCRIBER' } });
    
    // Updating cache
    this.cache.set(`channel-isCreatingNewSubscriber-${chat_id}`, true);

    ctx.editMessageText(message.text, message.options);
    // +todo
    // ctx.reply(message.text, message.options)
  };
};

// Message listener
@Injectable()
export class CreateSubscriberProcessController implements OnApplicationBootstrap, IBotCommand {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly cache: CacheService,
    private readonly service: CreateSubscriberService,
    private readonly subscriberService: SubscriberService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(CreateSubscriberProcessController));
  };

  // Command-related
  // - pattern listens to all incoming messages
  public pattern = /[\s\S]+/;

  public async run(ctx: Context) {
    const chat_id = String(ctx.update?.message?.from.id)
    if (this.cache.get(`channel-isCreatingNewSubscriber-${chat_id}`)) {
      // +todo add more tags delimiters
      const tags = String(ctx.update?.message?.text).split(' ');
      if (!tags) return;

      await this.subscriberService.create(chat_id, tags);

      // +todo
      // delete (or change) CreateNew message

      // Update cache
      this.cache.set(`channel-isCreatingNewSubscriber-${chat_id}`, false);

      // Sending message
      const message = await this.service.messageBuilder(chat_id, 'Subscribed', tags);
      ctx.reply(message.text, message.options);
    };
  };
};