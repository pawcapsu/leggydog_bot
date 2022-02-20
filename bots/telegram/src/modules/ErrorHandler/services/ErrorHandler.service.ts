import { Injectable } from "@nestjs/common";
import { Context, InlineKeyboard } from "grammy";
import { _escapeCharacters } from "src/helpers";
import { LanguagesConfigService } from "src/modules/Languages/services";
import { EParseMode, Error } from "src/types";
import { ErrorType } from "src/types/enums/Errors";

@Injectable()
export class ErrorHandlerService {
  constructor(
    private readonly languageService: LanguagesConfigService,
  ) {}

  // public report
  public async report(ctx: Context, error: Error) {
    // Replying with built error message
    const message = await this.messageBuilder(error);
    ctx.reply(message.text, message.options);
  };

  // public messageBuilder
  public messageBuilder(error?: Error) {
    // Building error message
    if (error?.type != ErrorType.DEACTIVATED) {  
      return {
        text: _escapeCharacters(`*Error*\n\nError occured while trying to do something. Could you please report it here: @leggydog_logs?.\n\n*Error information:*\n\n\`Type:\` ErrorType.${error.type}\n\n\`Message:\` \`${error.message ?? '<not provided>'}\``),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            .text('Delete this', 'delete-me')
        },
      };
    } else {
      return {
        text: _escapeCharacters("*Bot is deactivated*"),
        options: {
          parse_mode: EParseMode.MARKDOWNV2
        },
      };
    };
  };
};