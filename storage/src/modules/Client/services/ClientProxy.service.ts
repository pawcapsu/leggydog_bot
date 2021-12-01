import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClientProxyService {
  constructor(
    // +todo
    // i know
    @Inject('MESSAGES')
    public readonly client: ClientProxy,
  ) {}
};