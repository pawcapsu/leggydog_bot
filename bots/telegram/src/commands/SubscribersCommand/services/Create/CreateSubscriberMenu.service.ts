import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { EParseMode } from 'src/types';

@Injectable()
export class CreateSubscriberService {
  constructor(
    private readonly languageService: LanguagesConfigService,
  ) {}

  // public messageBuilder
  public async messageBuilder(chat_id: string, type: "CreateNew" | "Subscribed" | "TagsError", tags?: String[]) {
    const language = await this.languageService.getByChannel(chat_id);
    
    if (type === "CreateNew") {
      return {
        text: _escapeCharacters(language.get('subscriber.create.createNew')),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard().
            text(language.get('common.buttons.cancel'), "cancelSubscriberCreation")
        },
      };
    } else if (type === "Subscribed") {
      return {
        text: _escapeCharacters(language.get('subscriber.create.subscribed', { tags })),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: new InlineKeyboard()
            .text(language.get('common.buttons.openMainMenu'), "openStartMenu")
        },
      };
    } else if (type === "TagsError") {
      return {
        text: _escapeCharacters(language.get('subscriber.create.tagsError', { tags })),
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