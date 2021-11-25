import { Injectable } from '@nestjs/common';
import { SubscriberService } from 'src/modules/Subscribers/services';
import { EParseMode, Error } from 'src/types';
import { _escapeCharacters } from 'src/helpers';
import { InlineKeyboard } from 'grammy';
import { ErrorHandlerService } from 'src/modules/ErrorHandler/services';

@Injectable()
export class MenuCommandService {
  constructor(
    private readonly subscribersService: SubscriberService,
    private readonly errorService: ErrorHandlerService,  
  ) {}

  // public messageBuilder
  public async messageBuilder(chat_id: string) {
    const subscribers = [];
    if (chat_id) {
      const response = await this.subscribersService.fetchMany(chat_id);

      subscribers.push(...response);
    };

    if (subscribers.length > 0) {
      return {
        text: _escapeCharacters(`*Dashboard*\n\nДоброго времени суток, человек! Надеюсь что на сегодня ты надумал что-то крутое :>\n\n*Кол-во подписок:* ${ subscribers.length } шт.\n_Подписка хранит в себе теги, по которым мы ищем новые картинки для вас._`),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            // Menus buttons
            .text("🔭 Subscribers", "openSubscriberMenu")
            .text("ℹ️ Inline search", "openInlineSearchInfoMenu")
            .text("❌ Close", "delete-me")
            .row()
            // Information buttons
            .url("Learn more", "https://services.pawcapsu.ml/leggybot")
            .url("Other services", "https://services.pawcapsu.ml")
        },
      };
    } else {
      return {
        text: _escapeCharacters("*Leggydog*\n\nПриветствую! Я очень рад что ты решил мною попользоваться, это прям невероятно круто и странно звучит! Ладно, проехали эту плохую шутку. Я бот, который будет следить за новыми постами на разных сайтах, и отправлять тебе самый свежий контент! На данный момент я поддерживаю только *E621*, но скоро добавится намного больше сайтов.\n\n\nЯ буду тебе помогать во всём, чём только смогу. Для того, что бы начать пользование, вам нужно зайти в меню `🔭 Subscribers`. Увидимся в этом меню!\n\nТак же я умею искать контент прямо в строке поиска! Зайдите в меню `ℹ️ Inline search` и почитайте про то, как круто и удобно меня использовать!"), 
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            // Menus buttons
            .text("🔭 Subscribers", "openSubscriberMenu")
            .text("ℹ️ Inline search", "openInlineSearchInfoMenu")
            .text("❌ Close", "delete-me")
            .row()
            // Information buttons
            .url("Learn more", "https://services.pawcapsu.ml/leggybot")
            .url("Other services", "https://services.pawcapsu.ml")
        },
      };
    };
  };
};