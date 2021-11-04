import { Bot } from "grammy";

export class TestCustom {
  initialize(bot: Bot) {
    bot.on('message', () => {
      console.log('Message from TestCustom');
    });
  };
}