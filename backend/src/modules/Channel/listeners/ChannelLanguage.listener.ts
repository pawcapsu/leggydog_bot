import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChannelStateService } from 'src/modules/Channel/services';

@Controller()
export class ChannelLanguageListener {
  constructor(
    private readonly channelStateService: ChannelStateService,
  ) {}
  
  // channel::changeLanguage
  @MessagePattern('channel::changeLanguage')
  public async handleChannelLanguageChange(
    @Payload() data: { identifier: string, language: string }
  ) {
    if (!data.identifier || !data.language) return null;

    // +todo proper checking
    // Checking language enum
    if (!['English', 'Russian'].includes(data.language)) return null;

    // Changing channel language
    return await this.channelStateService.updateLanguage(data.identifier, data.language);
  };
};