import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChannelState } from 'src/types';
import { ChannelStateService } from 'src/modules/Channel/services';

@Controller()
export class ChannelStateListener {
  constructor(
    private readonly channelStateService: ChannelStateService,
  ) {}

  // channel:fetch
  @MessagePattern('channel::fetch')
  public async fetchChannelState(
    @Payload() data: { identifier: string },
  ): Promise<ChannelState | null> {
    const channel = await this.channelStateService.fetchOne(data.identifier);

    return channel;
  };

  // channel::updateState

  // channel::clearState
};