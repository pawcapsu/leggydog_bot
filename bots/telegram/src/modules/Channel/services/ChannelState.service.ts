import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { CacheService } from 'src/modules/SimpleCache/services';
import { Error, IChannelState } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class ChannelService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,

    private readonly cache: CacheService,
  ) {}

  // public fetchOne
  public async fetchOne(chat_id: string): Promise<IChannelState> {
    return await firstValueFrom(
      this.client
        .send('channel::fetchOne', { identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError((error) => {
            throw new Error(ErrorType.TIMEDOUT, 'Unable to fetch ChannelState. Probably due to message broker error.');
          })
        )
    );
  };

  // public update
  // - Update channel's language
  // +todo create UpdateChannelInput for data property in shared project
  public async update(chat_id: string, data: { language?: string, action?: { type: string, data?: any } }): Promise<IChannelState> {
    return await firstValueFrom(
      this.client.send('channel::update', { identifier: chat_id, data })
      .pipe(
        timeout(2000),
        // +todo proper error catching
        catchError(() => {
          throw new Error(ErrorType.UNKNOWN, 'ChannelService->update')
        })
      )
    );
  };

  // public isActive
  public async isActive(chat_id: string): Promise<boolean> {
    // Checking if we have this value cached
    let isActive = this.cache.get(`channel-isActive-${chat_id}`);
    if (!isActive) {
      const channel = await this.fetchOne(chat_id);
      isActive = channel.active;

      // Saving this value to cache
      this.cache.set(`channel-isActive-${chat_id}`, isActive);
    };
    
    return isActive;
  };

  // public activate
  public async activate(chat_id: string): Promise<IChannelState> {
    const response = await firstValueFrom(
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

    // Updating cache
    this.cache.set(`channel-isActive-${chat_id}`, true);

    // Returning
    return response;
  };

  // public deactive
  public async deactivate(chat_id: string): Promise<IChannelState> {
    const response = await firstValueFrom(
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

    // Updating cache
    this.cache.set(`channel-isActive-${chat_id}`, false);

    // Returning
    return response;
  };
};