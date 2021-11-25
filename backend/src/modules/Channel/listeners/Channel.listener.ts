import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChannelState } from 'src/types';
import { ChannelService } from 'src/modules/Channel/services';

@Controller()
export class ChannelActionListener {
  constructor(
    private readonly ChannelService: ChannelService,
  ) {}

  // channel:fetch
  @MessagePattern('channel::fetch')
  public async fetchChannelState(
    @Payload() data: { identifier: string },
  ): Promise<ChannelState | null> {
    const channel = await this.ChannelService.fetchOne(data.identifier);
    return channel;
  };

  // channel::activate
  @MessagePattern('channel::activate')
  public async handleChannelActivation(
    @Payload() data: { identifier: string }
  ) {
    if (!data.identifier) throw new Error('Invalid payload');

    return await this.ChannelService.activate(data.identifier);
  };

  // channel::deactivate
  @MessagePattern('channel::deactivate')
  public async handleChannelDeactivation(
    @Payload() data: { identifier: string }
  ) {
    if (!data.identifier) throw new Error('Invalid payload');

    return await this.ChannelService.deactivate(data.identifier);
  };
  
  // channel::changeLanguage
  @MessagePattern('channel::changeLanguage')
  public async handleChannelLanguageChange(
    @Payload() data: { identifier: string, language: string }
  ) {
    if (!data.identifier || !data.language) throw new Error('Invalid payload');

    // +todo proper checking
    // Checking language enum
    if (!['English', 'Russian'].includes(data.language)) return null;

    // Changing channel language
    return await this.ChannelService.updateLanguage(data.identifier, data.language);
  };
};