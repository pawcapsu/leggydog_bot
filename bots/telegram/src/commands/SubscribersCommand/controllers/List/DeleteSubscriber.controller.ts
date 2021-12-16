import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { SubscriberListService } from "src/commands/SubscribersCommand/services";
import { SubscriberService } from "src/modules/Subscribers/services";
import { ERegisterScriptType, Error, IBotCallback } from "src/types";
import { Context } from "grammy";
import { ErrorType } from "src/types/enums/Errors";

// Callback
@Injectable()
export class DeleteSubscriberController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly service: SubscriberListService,
    private readonly subscribersService: SubscriberService,
  ) {}
  
  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(DeleteSubscriberController));
  };

  // Command-related
  public pattern: RegExp = /deleteSubscriber-/;
  
  public async run(ctx: Context) {
    const chat_id = String(ctx.update.callback_query?.from.id);
    const deleteSubscription = ctx.update.callback_query?.data?.replace(this.pattern, '');

    // Fetching all subscribers
    const subscribers = await this.subscribersService.fetchMany(chat_id);
    const subscriber = subscribers.find((x) => x._id == deleteSubscription);

    if (!subscriber) throw new Error(ErrorType.UNKNOWN, `Subscription with _id ${ deleteSubscription } does not exists.`);

    // Getting previous (or next) subscription
    // id
    const options = this.service._determineOptions(subscriber, subscribers);
    const toSubscriber: string | null = options.previousSubscriber ?? options.nextSubscriber;

    // Deleting subscriber
    // +todo response for this request is { deleted: boolean }.
    // try to do something with it? Error handling, for example
    await this.subscribersService.deleteOne(deleteSubscription);

    // Opening SubscribersList menu
    const message = await this.service.messageBuilder(chat_id, toSubscriber);
    ctx.editMessageText(message.text, message.options);
  };
};