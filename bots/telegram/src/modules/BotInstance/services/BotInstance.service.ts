import { Injectable, Logger } from "@nestjs/common";
import { run } from '@grammyjs/runner';
import { Bot } from "grammy";
import { EParseMode, ERegisterScriptType, Error, IBotCallback, IBotCommand, TRegisterScriptInstanceType } from "src/types";
import { LanguagesConfigService } from "src/modules/Languages/services";
import { ChannelService } from "src/modules/Channel/services";
import { ErrorHandlerService } from "src/modules/ErrorHandler/services";
import { ErrorType } from "src/types/enums/Errors";

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
    private readonly channelService: ChannelService,
    private readonly languagesService: LanguagesConfigService,
    private readonly errorsService: ErrorHandlerService,
  ) {
    // Creating new bot instance
    this.bot = new Bot(process.env.TELEGRAM_KEY);
    
    // Adding command listener
    this.bot.on('message', async (ctx) => {
      if (ctx.update?.message?.text) {
        // Finding command with this pattern
        const command = ctx.update?.message?.text.replace('/', '');
        const instances = this.commands.filter((x) => x.pattern.test(command));

        // Checking if instance of this command even exists
        if (instances.length <= 0) return;

        // Checking if bot is active for this channel
        const chat_id = String(ctx.update?.message?.from?.id);
        let isActive = false;
        try {
          // +todo add basic cache system
          // to speed things up
          isActive = await this.channelService.isActive(chat_id);
        } catch {
          // +todo
        };

        // hard-coded lol
        if (!isActive && command != 'start') {
          const message = this.errorsService.messageBuilder(new Error(ErrorType.DEACTIVATED));
          ctx.reply(message.text, message.options);

          return;
        };

        // Running this command in
        // a sandbox to catch all errors
        instances.forEach((instance) => {
          instance.run(ctx)
          .catch(async (error: any) => {
            // Handle error
            this.logger.error('Command sandbox error');
            console.error(error);
  
            const message = this.errorsService.messageBuilder(error as Error);
            ctx.reply(message.text, message.options);
          });
        });
      };
    });

    // Callback listener
    this.bot.on("callback_query:data", async (ctx) => {
      if (ctx.update.callback_query?.data) {
        // Finding command with this pattern
        const callback = ctx.update.callback_query?.data;
        const instances = this.callbacks.filter((x) => x.pattern.test(callback));

        // Checking if instance of this command even exists
        if (instances.length <= 0) return;

        // Checking if bot is active for this channel
        const chat_id = String(ctx.update?.callback_query?.from?.id);
        let isActive = false;
        try {
          // +todo add basic cache system
          // to speed things up
          isActive = await this.channelService.isActive(chat_id);
        } catch {
          // +todo
        };

        if (!isActive && !ctx.update?.callback_query?.data.includes('setLanguage-')) {
          const message = this.errorsService.messageBuilder(new Error(ErrorType.DEACTIVATED));
          ctx.reply(message.text, message.options);

          return;
        };

        // Running this callback in a sandbox
        // to catch all errors
        instances.forEach((instance) => {
          instance.run(ctx)
          .catch(async (error: any) => {
            // Handle error
            this.logger.error('Callback sandbox error');
            console.error(error);
  
            const message = this.errorsService.messageBuilder(error as Error);
            ctx.reply(message.text, message.options);
          });
        });
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