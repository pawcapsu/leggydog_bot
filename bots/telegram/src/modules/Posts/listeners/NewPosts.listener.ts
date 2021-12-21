import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { NewPostService } from '../services';
import { IPostField } from 'types';
import { ChannelService } from 'src/modules/Channel/services';
import * as mime from 'mime-types';
import { ErrorHandlerService } from 'src/modules/ErrorHandler/services';
import { Error } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Controller()
export class NewPostsListener {
  constructor(
    private readonly instance: BotInstanceService,
  
    private readonly errorService: ErrorHandlerService,
    private readonly channelService: ChannelService,
    private readonly service: NewPostService,
  ) {}

  // NewPost listener
  @EventPattern('telegram::sendNewPost')
  public async handleNewPost(
    @Payload() 
    data: {
      identifier: string, 
      image: string, 
      fields: Array<IPostField>, 
    },
  ) {
    const bot = this.instance.bot;
  
    // Check chat information
    try {
      await bot.api.getChat(data.identifier);
    } catch {
      return;
    };

    // Checking if this channel is active or no
    const isActive = await this.channelService.isActive(data.identifier);
    if (!isActive) return;

    // Forming message and sending it to this chat
    const message = await this.service.messageBuilder(data.identifier, data.fields);

    // +todo improv
    const extension = mime.lookup(data.image);
  
    // Gif
    if (['image/gif'].includes(extension)) {
      bot.api.sendDocument(data.identifier, data.image, message)
      .catch(async () => {
        // Send error message
        const message = await this.errorService.messageBuilder(new Error(ErrorType.UNKNOWN, `Could not send gif with url ${ data.image }`));
        bot.api.sendMessage(data.identifier, message.text, message.options);
      });
    };

    // Image
    if (['image/png', 'image/jpg'].includes(extension)) {
      bot.api.sendPhoto(data.identifier, data.image, message)
      .catch(async () => {
        // Send error message
        const message = await this.errorService.messageBuilder(new Error(ErrorType.UNKNOWN, `Could not send photo with url ${ data.image }`));
        bot.api.sendMessage(data.identifier, message.text, message.options);
      });
    };
  };
};