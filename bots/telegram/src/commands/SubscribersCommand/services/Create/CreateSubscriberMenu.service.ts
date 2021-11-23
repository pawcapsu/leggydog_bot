import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { EParseMode } from 'src/types';

@Injectable()
export class CreateSubscriberService {
  // public messageBuilder
  public messageBuilder(type: "CreateNew" | "Subscribed" | "TagsError", tags?: String[]) {
    if (type === "CreateNew") {
      return {
        text: _escapeCharacters("*Создать новую подписку*\n\nСоздавая подписку, вы подписываетесь на определённые теги на сайте *E621*.\n\nВам будут присылаться все новые картинки, вне зависимости от рейтинга, комментариев либо других тегов.\n\nДля того, что бы подписаться на какие-либо теги, *просто впишите в чат теги через пробел*.\n\nСписок всех доступных тегов: [Ссылка](https://e621.net/tags)"),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard().
            text("Cancel", "cancelSubscriberCreation")
        },
      };
    } else if (type === "Subscribed") {
      return {
        text: _escapeCharacters(`*Вы подписали на теги*\n\`${ tags.join(", ") }\`\n\nТеперь я буду отправлять вам все самые новые картинки по этим тегам, ура-ура-ура!\n\nВ ближайшие несколько минут придёт ваша самая первая картинка, в которой будет описанно что с ней можно делать дальше.\n\nОсталось просто подождать!`),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            .text("Go to main menu", "openStartMenu")
        },
      };
    } else if (type === "TagsError") {
      return {
        text: _escapeCharacters(`Ошибка!\n\n*Данные теги:* \n\n\`${ tags.join(", ") }\` \n\n*не существуют.*\n\nПожалуйста, попробуйте снова. Вот, кстати, весь список доступных тегов: [Ссылка](https://e621.net/tags)`),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            .text("Create anyway")
            .text("Retry", "subscriberCreate")
            .row()
            .text("Go to main menu", "openStartMenu")
        },
      }
    };
  }
};