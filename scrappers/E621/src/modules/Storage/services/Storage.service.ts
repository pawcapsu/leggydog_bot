import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, of, timeout, catchError } from 'rxjs';
import { IPost } from 'types';

@Injectable()
export class StorageService {
  constructor(
    @Inject('DATA_REQUESTS')
    private client: ClientProxy
  ) {}

  // commitPost

  // getLatestPost
  public async getLatestPost(): Promise<IPost | null> {
    return await firstValueFrom(
      this.client
        .send('storage::getLatestPost', {})
        .pipe(
          timeout(2000),
          catchError(() => {
            return of(null);
          })
        ),
    );
  };

  // updateLatestPost
  public async updateLatestPost(post: IPost) {
    this.client.emit('storage::updateLatestPost', post);
  };
};