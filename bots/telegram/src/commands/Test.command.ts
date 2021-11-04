import { Context } from 'grammy';

export class BotCommand {
  public command = 'test';

  execute(ctx: Context) {
    ctx.reply('test');
  }
}
