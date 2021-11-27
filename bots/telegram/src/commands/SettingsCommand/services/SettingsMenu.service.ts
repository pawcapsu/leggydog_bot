import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { EParseMode } from 'src/types';

@Injectable()
export class SettingsMenuService {
  constructor(
    private readonly languageService: LanguagesConfigService,
  ) {}
  
  // messageBuilder
  public async messageBuilder(chat_id: string) {
    const language = await this.languageService.getByChannel(chat_id);

    // Building and returning message
    return {
      text: _escapeCharacters(language.get('settings')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Language settings
          .text(language.get('settings.buttons.language'), 'settings-changeLanguage')

          .row()
          // Main menu
          .text(language.get('common.buttons.openMainMenu'), 'openStartMenu')
      }
    }
  };
};