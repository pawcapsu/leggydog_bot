import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { Error, IChannelState } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class ChannelService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,
  ) {}

  // public fetchOne
  public async fetchOne(chat_id: string): Promise<IChannelState> {
    return await firstValueFrom(
      this.client
        .send('channel::fetch', { identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError((error) => {
            throw new Error(ErrorType.TIMEDOUT, 'Unable to fetch ChannelState. Probably due to message broker error.');
          })
        )
    );
  };

  // public isActive
  public async isActive(chat_id: string): Promise<boolean> {
    const channel = await this.fetchOne(chat_id);
    console.log(channel);
    
    return channel.active ?? false;
  };

  // public activate
  public async activate(chat_id: string): Promise<IChannelState> {
    return await firstValueFrom(
      this.client
        .send('channel::activate', { identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError(() => {
            // +todo
            throw new Error(ErrorType.UNKNOWN, 'Unknown channel::activate error');
          })
        )
    )
  };

  // public deactive
  public async deactivate(chat_id: string): Promise<IChannelState> {
    return await firstValueFrom(
      this.client
        .send('channel::deactivate', { identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError(() => {
            // +todo
            throw new Error(ErrorType.UNKNOWN, 'Unknown channel::deactivate error');
          })
        )
    )
  };

  // public updateLanguage
  // - Update channel's language
  public async updateLanguage(chat_id: string, language: string): Promise<Error | IChannelState> {
    return await firstValueFrom(
      this.client.send('channel::changeLanguage', { identifier: chat_id, language: language })
      .pipe(
        timeout(2000),
        // +todo proper error catching
        catchError(() => {
          return of(new Error(ErrorType.UNKNOWN, 'ChannelService'))
        })
      )
    );
  };
};