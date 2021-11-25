import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { ChannelService } from 'src/modules/Channel/services';
import { Error as SystemError, Language, LanguageProperty } from 'src/types';

@Injectable()
export class LanguagesConfigService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,

    private readonly ChannelService: ChannelService,
  ) {}

  // Properties
  public languages: Language[] = [];
  private logger = new Logger(LanguagesConfigService.name);

  // getByChannel
  public async getByChannel(chat_id: string): Promise<Language> {
    // Fetching ChannelState
    const channel = await this.ChannelService.fetchOne(chat_id);

    const language = this.getByName(channel.language ?? 'English');
    return language;
  };

  // public getByName
  // - Returns l
  public getByName(name: string): Language {
    return this.languages.find((lang) => lang.name == name) ?? this.languages[0];
  };

  // public fetchLanguages
  public async fetchLanguages() {
    // Fetching languages from
    const languages: { name: string, properties: LanguageProperty[] }[] = 
      await firstValueFrom(
        this.client
          .send('languages::fetchAll', {})
          .pipe(
            timeout(5000),
            catchError(() => {
              return of(null)
            }),
          )
        );

    if (!languages) {
      this.logger.warn('LanguagesFetcher error');
      return;
    };

    this.logger.debug('Languages fetched and is due to be saved.');
    
    // Saving fethed languages into class's public
    // properties
    this.languages = [];
    languages.forEach((rawLanguage) => {
      const language = new Language(rawLanguage.name, rawLanguage.properties);
      this.languages.push(language);
    });
  };
};