import { Injectable, Logger } from "@nestjs/common";
import { run } from '@grammyjs/runner';
import { Bot } from "grammy";
import { ERegisterScriptType, IBotCommand, TRegisterScriptInstanceType } from "src/types";

@Injectable()
export class BotInstanceService {
  // Bot instance
  private bot: Bot;

  // Logger instance
  private logger = new Logger(BotInstanceService.name);

  // Registered commands
  private commands: Array<IBotCommand> = [];

  // Registered callbacks

  // Registered customs

  //
  constructor() {
    // Creating new bot instance
    this.bot = new Bot(process.env.TELEGRAM_KEY);

    // Adding command and callbacks listeners
    this.bot.on('message', (ctx) => {
      if (ctx.update?.message?.text) {
        // Finding command with this pattern
        const command = ctx.update?.message?.text.replace('/', '');
        const instance = this.commands.find((x) => x.pattern.test(command));

        // Checking if instance of this command even exists
        if (!instance) return;

        // Running this command
        instance.run(ctx);
      };
    });
  }

  // public start
  public start() {
    this.logger.warn('Starting BotInstance');
    run(this.bot);
  };

  // public register
  public register(type: ERegisterScriptType, instance: TRegisterScriptInstanceType) {
    // command register
    if (type == ERegisterScriptType.COMMAND) {
      this.logger.log(`Registered command with pattern ${instance.pattern}`);
      this.commands.push(instance);
    };
  };
};