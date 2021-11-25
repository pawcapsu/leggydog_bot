import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { Error } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('DATA_REQUESTS')
    private client: ClientProxy,
  ) {}

  // public fetchMany
  // +todo
  public async fetchMany(chat_id: string | number) {
    return await firstValueFrom(
      this.client
        .send('subscribers::fetch', { type: 'TELEGRAM', identifier: String(chat_id) })
        .pipe(
          timeout(2000),
          catchError((error) => {
            throw new Error(ErrorType.TIMEDOUT, 'Unable to fetch Subscribers array. Probably due to message broker error.');
          })
        )
    );
  };

  // public fetchOne

  // public create
  public async create(chat_id: string, tags: string[]) {
    // Forming payload
    // +todo add some kind of a shared input class for
    // backend and telegram service
    const payload = {
      consumer: {
        type: 'TELEGRAM',
        identifier: chat_id,
      },

      source: {
        type: 'E621',

        // ESix-related
        tags: tags,
      }
    };

    console.log(payload);

    // Making request
    return await firstValueFrom(
      this.client
        .send('subscriber::create', payload)
        .pipe(
          timeout(5000),
          catchError((error) => {
            throw new Error(ErrorType.UNKNOWN, 'Unknown error while trying to create subscriber');
          })
        )
    );
  };
};