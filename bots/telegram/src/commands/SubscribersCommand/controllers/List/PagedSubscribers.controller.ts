import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Context } from "grammy";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { ERegisterScriptType, IBotCallback } from "src/types";
import { SubscriberListService } from "src/commands/SubscribersCommand/services";

// PagedSubscriber callback
@Injectable()
export class PagedSubscriberCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: SubscriberListService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(PagedSubscriberCallbackController));
  };

  // Callback-related
  public pattern = /(nextSubsciberInfo-|previousSubsciberInfo-)/;

  public async run(ctx: Context) {
    const chat_id = String(ctx.update.callback_query?.from.id);
    // +todo use f*cking regex
    const toSubscription = ctx.update.callback_query?.data?.replace(this.pattern, '');

    const message = await this.service.messageBuilder(chat_id, toSubscription);
    ctx.editMessageText(message.text, message.options);
    ctx.answerCallbackQuery();
    // +todo
    // ctx.reply(message.text, message.options);
  };
};