import { Injectable } from "@nestjs/common";
import { Context, InlineKeyboard } from "grammy";
import { _escapeCharacters } from "src/helpers";
import { EParseMode, Error } from "src/types";

@Injectable()
export class ErrorHandlerService {
  // public report
  public report(ctx: Context, error: Error) {
    // Replying with built error message
    const message = this.messageBuilder(error);
    ctx.reply(message.text, message.options);
  };

  // public messageBuilder
  public messageBuilder(error: Error) {
    // Building error message
    return {
      // +todo
      text: _escapeCharacters(`*Ошибка*\n\nПроизошла ошибка во время выполнения этой команды. Просим вас либо попробывать ещё раз либо написать в чат <ТУТ ЧАТ>.\n\nСообщение об ошибке:\n\n\`Type:\` ErrorType.${error.type}\n\n\`Message:\` ${error.message ?? '<not provided>'}`),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          .url("Learn more", "https://services.pawcapsu.ml/leggybot")
      },
    };
  };
};