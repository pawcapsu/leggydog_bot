import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionDocument } from 'src/types';
import { ChannelService } from 'src/modules/Channel/services';
import { IPost, IPostField, EPostFieldType } from 'types';
import { ESubscriptionConsumerType } from 'src/types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SendPostService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly client: ClientProxy,

    private readonly channelService: ChannelService,
  ) {}

  // public send
  public async send(subscription: SubscriptionDocument, post: IPost) {
    // Getting Channel information
    const channel = await this.channelService.fetchOne(subscription.consumer.identifier);

    // +todo
    // different post layouts for different posts ???
    // Extracting NewPostNotification layout from channel information
    // const layout = channel.layout?.post;
    const settings = channel.settings.notifications;
    const fields: Array<IPostField> = [];

    settings.fields.forEach((field) => {
      // Description field
      if (field.type == EPostFieldType.DESCRIPTION) {
        fields.push({
          type: field.type,
          value: post.description,
        })
      };

      // +todo
      // Author field
      if (field.type == EPostFieldType.AUTHOR) {
        // fields.push({
        //   type: field.type,
        //   value: post.
        // })
      };
      
      // Post link field
      if (field.type == EPostFieldType.POST_LINK) {
        fields.push({
          type: field.type,
          value: `https://e621.net/posts/${ post.id }`,
        });
      };

      // Watchable tags
      // if (field.type == )
    });

    // +todo
    if (!post.file_url) return;

    // Asking Telegram/Discord instance to send NewPost notification to
    // consumer
    if (subscription.consumer.type == ESubscriptionConsumerType.TELEGRAM) {
      // Sending request
      console.log("send new post");
      this.client.emit('telegram::sendNewPost', { identifier: subscription.consumer.identifier, post: post, fields });
    };
  };
};