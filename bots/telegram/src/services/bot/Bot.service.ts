import { Logger, Injectable } from '@nestjs/common';
import { GatewayService } from 'src/services';
import { run } from '@grammyjs/runner';
import { Bot } from 'grammy';

// Importing
// - callbacks
import * as BotCallbacks from 'src/callbacks';

// - commands
import * as BotCommands from 'src/commands';

// - customs
import * as BotCustoms from 'src/customs';

@Injectable()
export class BotService {
  // private bot instance
  private bot: Bot;

  private callbacks = [];
  private logger = new Logger(BotService.name);

  // Constructing our bot
  constructor(
    private readonly gateway: GatewayService,
  ) {
    // Starting Telegram Bot
    this.bot = new Bot('2075231096:AAFOXlhk5sgh0waUNsmtnDIxVAjRYX_uUr8');

    //
    // Initializing callbacks
    [...Object.values(BotCallbacks)].forEach((Callback) => {
      const instance = new Callback();
      this.logger.log(`Initializing ${instance.pattern} (${Callback.name}) callback`);
      this.callbacks.push(instance);
    });

    // Listening for callbacks
    this.bot.on('callback_query:data', (ctx) => {
      this.callbacks.forEach((callback) => {
        if (ctx.update.callback_query?.data.includes(callback.includes)) {
          callback.execute(ctx);
        }
      });
    });

    //
    // Initializing commands
    [...Object.values(BotCommands)].forEach((command) => {
      const instance = new command(gateway);
      this.logger.log(
        `Initializing ${instance.command} (${command.name}) command`,
      );
      this.bot.command(instance.command, (ctx) => {
        instance.execute(ctx);
      });
    });

    //
    // Initializing customs
    [...Object.values(BotCustoms)].forEach((custom) => {
      const instance = new custom();
      this.logger.log(
        `Initializing ${custom.name} custom`
      );
      instance.initialize(this.bot);
    });

  }

  // public start
  public start() {
    this.logger.warn('Starting Bot instance using grammy/runner');
    run(this.bot);
  }

  // public getInstance
  public getInstance(): Bot {
    return this.bot;
  }
}
