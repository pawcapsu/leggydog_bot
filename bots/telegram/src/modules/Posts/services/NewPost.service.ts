import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { EParseMode } from 'src/types';
import { IPostField, EPostFieldType } from 'types';

@Injectable()
export class NewPostService {
  constructor(
    private readonly languageService: LanguagesConfigService,
  ) {}

  // public messageBuilder
  public async messageBuilder(
    chat_id: string,
    fields: Array<IPostField>  
  ) {
    const language = await this.languageService.getByChannel(chat_id);
    let caption = language.get('notification.title');

    // Looping through fiels and adding messages to caption
    fields.forEach((field) => {
      // Description field
      if (field.type == EPostFieldType.DESCRIPTION) {
        let description: String = field.value == '' ? language.get('notification.field.description.empty') : (field.value) as String;
        if (description.split('').length > 50) {
          description = description.slice(0, 50) + `\n${ language.get('notification.field.description.more') }`
        };

        caption += language.get('notification.field.description', { description });
      };

      // Watchable tags field
    });

    // Building message
    return {
      caption: _escapeCharacters(caption),
      parse_mode: EParseMode.MARKDOWNV2,
      reply_markup: new InlineKeyboard()
        .text(language.get('notification.dislikePost'), "delete-me")
    }
  };
};