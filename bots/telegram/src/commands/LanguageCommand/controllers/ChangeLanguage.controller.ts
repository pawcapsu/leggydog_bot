import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback, IBotCommand } from 'src/types';
import { LanguagesMenuService } from 'src/commands/LanguageCommand/services';
import { Context } from 'grammy';
import { ChannelStateService } from 'src/modules/Channel/services';

// Command
@Injectable()
export class ChangeLanguageCommand implements OnApplicationBootstrap, IBotCommand {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: LanguagesMenuService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(ChangeLanguageCommand));
  };

  // Command-related
  public pattern = /languages/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from?.id), 'UserDecision');
    // +todo
    ctx.reply(message.text, message.options);
  };
};


// Callbacks
@Injectable()
export class ChangeLanguageCallback implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly service: LanguagesMenuService,
    private readonly channelService: ChannelStateService,  
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(ChangeLanguageCallback));
  };

  // Command-related
  public pattern = /setLanguage-[\s\S]+/;
  
  public async run(ctx: Context) {
    const chat_id = String(ctx.update?.callback_query?.from?.id);
    const language = ctx.update?.callback_query?.data?.replace('setLanguage-', '');

    await this.channelService.updateLanguage(String(chat_id), language);
    const message = await this.service.messageBuilder(chat_id, 'SystemPrompt');
    
    // +todo
    ctx.editMessageText(message.text, message.options);
  };
};