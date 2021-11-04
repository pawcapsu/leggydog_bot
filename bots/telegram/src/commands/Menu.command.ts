// Importing modules
import { StartCommand } from '.';
import { Context } from 'grammy';
import { GatewayService } from 'src/services';

// Exporting Menu command
export class MenuCommand {
  public command = 'menu';
  private startCommand: StartCommand;
  
  constructor(gateway: GatewayService) {
    this.startCommand = new StartCommand(gateway);
  };

  async execute(ctx: Context) {
    const message = await this.startCommand._messageBuilder(ctx.update?.message?.chat?.id);
    ctx.reply(message.text, message.options);
  };
};
