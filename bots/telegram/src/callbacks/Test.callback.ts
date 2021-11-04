import { Context } from 'grammy';

export class TestCallback {
  public pattern = 'test';

  execute(ctx: Context) {
    ctx.reply('Hello there!');
  }
}
