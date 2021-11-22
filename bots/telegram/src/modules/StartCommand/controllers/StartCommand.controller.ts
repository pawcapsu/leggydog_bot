import { Injectable, OnApplicationBootstrap} from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';
import { Context } from "grammy";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { MenuCommandService } from "src/modules/MenuCommand/services";
import { ERegisterScriptType, IBotCommand } from "src/types";

// Exporting StartCommand
@Injectable()
export class StartCommand implements OnApplicationBootstrap, IBotCommand {
  // private instance: Bot
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly instance: BotInstanceService,

    private readonly service: MenuCommandService,
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
    const message = await this.service.messageBuilder('');
    ctx.reply(message.text, message.options);
  };
};