import { Injectable, OnApplicationBootstrap} from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';
import { Context } from "grammy";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { ERegisterScriptType, IBotCommand } from "src/types";
import { LanguagesMenuService } from "src/commands/LanguageCommand/services";

// Exporting StartCommand
@Injectable()
export class StartCommand implements OnApplicationBootstrap, IBotCommand {
  // private instance: Bot
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly instance: BotInstanceService,

    private readonly service: LanguagesMenuService,
  ) {}

  // registering 
  async onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(StartCommand));
  };

  // Command-related
  // - pattern
  public pattern = /start/;

  // - run command
  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from.id), 'SystemPrompt');
    ctx.reply(message.text, message.options);
  };
};