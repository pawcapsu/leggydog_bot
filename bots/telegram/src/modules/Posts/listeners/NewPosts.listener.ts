import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BotInstanceService } from 'src/modules/BotInstance/services';
import { NewPostService } from '../services';
import { IPostField } from 'types';

@Controller()
export class NewPostsListener {
  constructor(
    private readonly instance: BotInstanceService,
  
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

    // Forming message and sending it to this chat
    const message = await this.service.messageBuilder(data.identifier, data.fields);
    console.log('send new post');

    // +todo send animation
    // or send image???
    await bot.api.sendPhoto(data.identifier, data.image, message);
  };
};