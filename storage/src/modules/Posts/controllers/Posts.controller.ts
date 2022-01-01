import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

// +todo
@Controller()
export class PostsController {
  private latestPost: { id: string };
  
  // getLatestPost
  @MessagePattern('storage::getLatestPost')
  public getLatestPost() {
    return this.latestPost ?? {};
  };

  // updateLatestPost
  @EventPattern('storage::updateLatestPost')
  public updateLatestPost(
    @Payload() data: { id: string }
  ) {
    this.latestPost = data;
  };
};
