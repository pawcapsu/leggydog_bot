import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChannelState, EChannelActionType, ELanguageType, Error, ErrorType, UpdateChannelInput } from 'src/types';
import { ChannelService } from 'src/modules/Channel/services';

@Controller()
export class ChannelActionListener {
  constructor(
    private readonly ChannelService: ChannelService,
  ) {}

  // channel:fetchOne
  @MessagePattern('channel::fetchOne')
  public async fetchOneChannel(
    @Payload() data: { identifier: string },
  ): Promise<ChannelState | null> {
    const channel = await this.ChannelService.fetchOne(data.identifier);
    return channel;
  };

  // channel::changeLanguage
  @MessagePattern('channel::update')
  public async updateChannel(
    @Payload() payload: { identifier: string, data: UpdateChannelInput }
  ) {
    if (!payload.identifier) return new Error(ErrorType.INVALID_PAYLOAD, 'Identifier is not set.');

    // +todo proper checking
    
    // language
    if (payload.data.language) {
      // Checking language enum
      // +todo proper checking
      if (!Object.values(ELanguageType).includes(payload.data.language)) return new Error(ErrorType.INVALID_PAYLOAD, 'Updatable language is not set or invalid.');
    };

    // action
    if (payload.data.action) {
      // +todo proper checking (probably)
      if (!Object.values(EChannelActionType).includes(payload.data.action?.type)) return new Error(ErrorType.INVALID_PAYLOAD, 'Updatable action.type is not set or invalid.')
    };

    // Changing channel language
    return await this.ChannelService.update(payload.identifier, payload.data);
  };

  // channel::activate
  @MessagePattern('channel::activate')
  public async handleChannelActivation(
    @Payload() data: { identifier: string }
  ) {
    if (!data.identifier) return new Error(ErrorType.INVALID_PAYLOAD, 'Identifier is not set.');

    return await this.ChannelService.activate(data.identifier);
  };

  // channel::deactivate
  @MessagePattern('channel::deactivate')
  public async handleChannelDeactivation(
    @Payload() data: { identifier: string }
  ) {
    if (!data.identifier) return new Error(ErrorType.INVALID_PAYLOAD, 'Identifier is not set.');

    return await this.ChannelService.deactivate(data.identifier);
  };
};