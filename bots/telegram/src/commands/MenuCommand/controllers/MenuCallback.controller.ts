import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback } from 'src/types';
import { MenuCommandService } from '../services';

@Injectable()
export class MenuCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: MenuCommandService,
  ) {}

  // Registering callback
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(MenuCallbackController));
  };

  // Callback-related
  public pattern = /openStartMenu/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from?.id));

    // +todo
    ctx.editMessageText(message.text, message.options);
    // ctx.reply(message.text, message.options);
  };
};