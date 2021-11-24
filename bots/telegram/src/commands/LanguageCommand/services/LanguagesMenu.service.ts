import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { EParseMode } from 'src/types';

@Injectable()
export class LanguagesMenuService {
  constructor(
    private readonly languageService: LanguagesConfigService,
  ) {}

  // messageBuilder
  public async messageBuilder(chat_id: string, type?: 'SystemPrompt' | 'UserDecision') {
    const language = await this.languageService.getByChannel(chat_id);

    return {
      text: _escapeCharacters(language.get('languages.chooseText')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Menus buttons
          .text("English", "setLanguage-English")
          .text("ℹRussian", "setLanguage-Russian")
      }
    }
  };
};