import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { ChannelStateService } from 'src/modules/Channel/services';
import { Error as SystemError, Language, LanguageProperty } from 'src/types';

@Injectable()
export class LanguagesConfigService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,

    private readonly channelStateService: ChannelStateService,
  ) {}

  // Properties
  public languages: Language[] = [];
  private logger = new Logger(LanguagesConfigService.name);

  // getByChannel
  public async getByChannel(chat_id: string): Promise<Language | null> {
    // Fetching ChannelState
    const channel = await this.channelStateService.fetchOne(chat_id);
    if (channel instanceof SystemError) throw new Error(JSON.stringify(channel));

    const language = this.getByName(channel.language ?? 'English');
    return language;
  };

  // public getByName
  // - Returns l
  public getByName(name: string): Language | null {
    return this.languages.find((lang) => lang.name == name);
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
              throw new Error('Error while trying to fetch languages: Timedout');
            }),
          )
        );
      
    
    // Saving fethed languages into class's public
    // properties
    this.languages = [];
    languages.forEach((rawLanguage) => {
      const language = new Language(rawLanguage.name, rawLanguage.properties);
      this.languages.push(language);
    });
  };
};