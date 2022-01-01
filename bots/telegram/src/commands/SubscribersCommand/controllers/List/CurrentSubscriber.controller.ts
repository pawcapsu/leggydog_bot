import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Context } from "grammy";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { ERegisterScriptType, IBotCallback } from "src/types";
import { SubscriberListService } from "src/commands/SubscribersCommand/services";

// SubscribersKeyboard callback
@Injectable()
export class CurrentSubscriberCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: SubscriberListService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(CurrentSubscriberCallbackController));
  };

  // Callback-related
  public pattern = /subscriberMenu-subscribersKeyboard/;

  public async run(ctx: Context) {
    const chat_id = ctx.update.callback_query?.from.id;
    const message = await this.service.messageBuilder(String(chat_id));
    ctx.editMessageText(message.text, message.options);
    ctx.answerCallbackQuery();
    // +todo
    // ctx.reply(message.text, message.options);
  };
};

// delete subscriber