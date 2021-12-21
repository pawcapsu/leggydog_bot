import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context } from 'grammy';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { StopCommandService } from 'src/commands/StopCommand/services';
import { ChannelService } from 'src/modules/Channel/services';
import { ERegisterScriptType, IBotCallback, IBotCommand } from 'src/types';

// Command
@Injectable()
export class StopCommandController implements OnApplicationBootstrap, IBotCommand {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,

    private readonly service: StopCommandService,  
    private readonly channelService: ChannelService,  
  ) {}
  
  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.COMMAND, this.moduleRef.get(StopCommandController));
  };

  // Command-related
  public pattern = /stop/;

  public display = true;
  public command = "/stop";
  public description = "Stop bot activity";

  public async run(ctx: Context) {
    // Stopping this bot
    const chat_id = String(ctx.update?.message?.from?.id)
    await this.channelService.deactivate(chat_id);

    const message = await this.service.messageBuilder(chat_id);
    ctx.reply(message.text, message.options);
  };
};

// Callback
@Injectable()
export class StopCallbackController implements OnApplicationBootstrap, IBotCallback {
  constructor(
    private readonly instance: BotInstanceService,
    private readonly moduleRef: ModuleRef,
    private readonly service: StopCommandService,  
  ) {}
  
  // Registering command
  onApplicationBootstrap() {
    this.instance.register(ERegisterScriptType.CALLBACK, this.moduleRef.get(StopCommandController));
  };

  // Command-related
  public pattern = /stopBo/;

  public async run(ctx: Context) {
    const message = await this.service.messageBuilder(String(ctx.update?.message?.from?.id));
    // +todo
    ctx.editMessageText(message.text, message.options);
  };
};