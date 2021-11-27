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
  public async messageBuilder(chat_id: string, type: 'SystemPrompt' | 'UserDecision' = 'UserDecision', fromSettingsMenu?: boolean) {
    const language = await this.languageService.getByChannel(chat_id);

    const reply_markup = new InlineKeyboard()
      // Menus buttons
      .text(language.get('languages.russian'), `setLanguage-Russian${ fromSettingsMenu ? '/fromSettings' : '' }`)
      .text(language.get('languages.english'), `setLanguage-English${ fromSettingsMenu ? '/fromSettings' : '' }`)

    // Show openStartMenu when this menu is opened by user
    // (not by typing /start command)
    if (type == 'UserDecision') {
      if (fromSettingsMenu) {
        reply_markup
          .row()
          .text(language.get('settings.button.returnToSettings'), 'openSettingsMenu');
      } else {
        reply_markup
          .row()
          .text(language.get('common.buttons.openMainMenu'), 'openStartMenu');
      }
    };

    return {
      text: _escapeCharacters(type == 'SystemPrompt' ? language.get('start') : language.get('languages')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup
      }
    }
  };
};