import { Injectable } from '@nestjs/common';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { EParseMode } from 'src/types';

@Injectable()
export class StopCommandService {
  constructor(
    private readonly languagesService: LanguagesConfigService,
  ) {}

  // public messageBuilder
  public async messageBuilder(chat_id: string) {
    const language = this.languagesService.getByChannel(chat_id);

    return {
      text: _escapeCharacters('hello there'),
      options: {
        parse_mode: EParseMode.MARKDOWNV2
      }
    }
  };
};