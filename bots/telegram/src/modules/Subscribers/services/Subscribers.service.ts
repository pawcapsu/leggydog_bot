import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { LogsService } from 'src/modules/Logs/services';
import { Error } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('DATA_REQUESTS')
    private client: ClientProxy,
  
    private readonly logsService: LogsService,
  ) {}

  // public fetchMany
  // +todo
  public async fetchMany(chat_id: string | number) {
    this.logsService.log('Fetching many subscribers!!1!');
    
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

  // public deleteOne
  public async deleteOne(subscriberId: string) {
    return await firstValueFrom(
      this.client
        .send('subscriber::deleteOne', { type: 'TELEGRAM', subscriberId })
        .pipe(
          timeout(2000),
          catchError((error) => {
            throw new Error(ErrorType.TIMEDOUT, `Unable to delete subscriber with id: ${ subscriberId }`);
          })
        )
    )
  };

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