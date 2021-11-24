import { Injectable, Logger } from "@nestjs/common";
import { run } from '@grammyjs/runner';
import { Bot } from "grammy";
import { ERegisterScriptType, IBotCallback, IBotCommand, TRegisterScriptInstanceType } from "src/types";
import { LanguagesConfigService } from "src/modules/Languages/services";

@Injectable()
export class BotInstanceService {
  // Bot instance
  private bot: Bot;

  // Logger instance
  private logger = new Logger(BotInstanceService.name);

  // Registered commands
  private commands: Array<IBotCommand> = [];

  // Registered callbacks
  private callbacks: Array<IBotCallback> = [];

  // Registered customs

  //
  constructor(
    private readonly languagesService: LanguagesConfigService
  ) {
    // Creating new bot instance
    this.bot = new Bot(process.env.TELEGRAM_KEY);

    // Fetching languages
    setInterval(() => {
      this.languagesService.fetchLanguages();
    }, 5000);

    // Adding command listener
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

    // Callback listener
    this.bot.on("callback_query:data", (ctx) => {
      if (ctx.update.callback_query?.data) {
        // Finding command with this pattern
        const callback = ctx.update.callback_query?.data;
        const instance = this.callbacks.find((x) => x.pattern.test(callback));

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
      this.logger.warn(`Registered command with pattern ${instance.pattern}`);
      this.commands.push(instance);
    } else if (type == ERegisterScriptType.CALLBACK) {
      this.logger.warn(`Registered callback with pattern ${instance.pattern}`);
      this.callbacks.push(instance);
    };
  };
};