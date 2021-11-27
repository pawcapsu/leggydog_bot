import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { ERegisterScriptType, IBotCallback, IBotCommand } from 'src/types';
import { SettingsMenuService } from 'src/commands/SettingsCommand/services';

// Command
@Injectable()
export class SettingsCommandController implements OnApplicationBootstrap, IBotCommand {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly service: SettingsMenuService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(SettingsCommandController));
  };

  // Command-related
  public pattern = /settings/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from.id));
    ctx.reply(message.text, message.options);
  };
};

// Callback
@Injectable()
export class SettingsCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
  
    private readonly service: SettingsMenuService,
  ) {}

  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(SettingsCallbackController));
  };
  
  // Callback-related
  public pattern = /openSettingsMenu/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.callback_query?.from.id));
    ctx.editMessageText(message.text, message.options);
  };
};