import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { NewPostService } from '../services';
import { IPost, IPostField } from 'types';
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
      post: IPost,
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
    if (!isActive) {
      return;
    };

    // Forming message and sending it to this chat
    const message = await this.service.messageBuilder(data.identifier, data.fields);

    // +todo
    const extension = mime.lookup(data.post.file_url.url);
  
    // Video (webm)
    if (['video/webm'].includes(extension)) {
      bot.api.sendDocument(data.identifier, data.post.file_url.url, message)
      .catch(async () => {
        // Send error message
        const message = await this.errorService.messageBuilder(new Error(ErrorType.UNKNOWN, `Could not send gif with url ${ data.post.file_url.url }`));
        bot.api.sendMessage(data.identifier, message.text, message.options);
      });
    };

    // Gif
    if (['image/gif'].includes(extension)) {
      bot.api.sendDocument(data.identifier, data.post.file_url.url, message)
      .catch(async () => {
        // Send error message
        const message = await this.errorService.messageBuilder(new Error(ErrorType.UNKNOWN, `Could not send gif with url ${ data.post.file_url.url }`));
        bot.api.sendMessage(data.identifier, message.text, message.options);
      });
    };

    // Image
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(extension)) {
      let url;
      
      // Determining how we need to send this image
      if (data.post.file_url.height < 10000 && data.post.file_url.width < 10000) {
        // Sending original message
        url = data.post.file_url.url;
      } else {
        // Sending sample
        if (data.post.sample_url) {
          url = data.post.sample_url.url;
        } else {
          // Oh okay
          url = data.post.file_url.url;
        };
      };

      bot.api.sendPhoto(data.identifier, url, message)
      .catch(async () => {
        // Send error message
        const message = await this.errorService.messageBuilder(new Error(ErrorType.UNKNOWN, `Could not send photo with url ${ url }`));
        bot.api.sendMessage(data.identifier, message.text, message.options);
      });
    };
  };
};