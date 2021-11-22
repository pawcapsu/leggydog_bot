import { Injectable, OnApplicationBootstrap} from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';
import { Context } from "grammy";
import { BotInstanceService } from "src/modules/BotInstance/services";
import { ERegisterScriptType, IBotCommand } from "src/types";
import { MenuCommandService } from "../services";

// Exporting MenuCommand
@Injectable()
export class MenuCommand implements OnApplicationBootstrap, IBotCommand {
  // private instance: Bot
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly instance: BotInstanceService,

    private readonly service: MenuCommandService,
  ) {}

  // registering 
  async onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(MenuCommand));
  };

  // Command-related
  // - pattern
  public pattern = /menu/;

  // - run command
  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from?.id));
    ctx.reply(message.text, message.options);
  };
};