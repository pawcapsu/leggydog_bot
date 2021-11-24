import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { Error, IChannelState } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class ChannelStateService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,
  ) {}

  // public fetchOne
  public async fetchOne(chat_id: string): Promise<Error | IChannelState> {
    return await firstValueFrom(
      this.client
        .send('channel::fetch', { identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError(() => {
            return of(new Error(ErrorType.TIMEDOUT, 'Unable to fetch ChannelState. Probably due to message broker error.'));
          })
        )
    );
  };

  // public updateLanguage
  public async updateLanguage(chat_id: string, language: string): Promise<Error | IChannelState> {
    return await firstValueFrom(
      this.client.send('channel::changeLanguage', { identifier: chat_id, language: language })
      .pipe(
        timeout(2000),
        // +todo proper error catching
        catchError(() => {
          return of(new Error(ErrorType.UNKNOWN, 'ChannelStateService'))
        })
      )
    );
  };
};