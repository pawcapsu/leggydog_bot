import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { LanguagesMenuService } from 'src/commands/LanguageCommand/services';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';

@Injectable()
export class ChangeLanguageCallback implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    
    private readonly languageMenuService: LanguagesMenuService,
  ) {}
  
  // Registering callback
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(ChangeLanguageCallback));
  };

  // Callback-related
  public pattern = /settings-changeLanguage/;

  public async run(ctx: Context) {
    const message = await this.languageMenuService.messageBuilder(String(ctx.update?.callback_query?.from?.id), 'UserDecision', true);
    ctx.editMessageText(message.text, message.options);
  };
};