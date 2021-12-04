import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, of, timeout, catchError } from 'rxjs';
import { IPost } from 'types';

@Injectable()
export class BackendService {
  constructor(
    @Inject('DATA_REQUESTS')
    private client: ClientProxy
  ) {}

  // processNewPosts
  public processNewPosts(posts: Array<IPost>) {
    this.client.emit('backend::processNewPosts', posts);
  };
};