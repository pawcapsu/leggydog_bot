import { Injectable } from '@nestjs/common';
import { BackendService } from 'src/modules/Backend/services';
import { PostsService } from 'src/modules/E621/services';
import { StorageService } from 'src/modules/Storage/services';
import { IPost, IUnserializedPost } from 'types';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly backendService: BackendService,
    private readonly storageService: StorageService,

    private readonly postsService: PostsService,
  ) {}

  // Scrapper status
  public working: boolean = false;

  // public process
  // - Start scrapping process
  public async process() {
    // Changing scrapper status
    this.working = true;

    try {
      let latestPost: IPost = await this.storageService.getLatestPost();

      // Checking if we have latest post information
      // or no
      if (!latestPost?.id) {
        // Getting latest post from E621
        latestPost = await this.postsService.fetchOne([]);
        
        // Updating information about latest post in storage
        await this.storageService.updateLatestPost(latestPost);

        // Waiting 5 seconds to not violate E621 request limit
        await (new Promise((resolve) => setTimeout(() => resolve(null), 5000)));
      };

      // Getting new posts
      const posts = await this.postsService.fetchMany([], 10, { page: `a${latestPost.id}` });

      if (posts.length > 0) {
        console.log("process new posts");
        console.log(posts.length);
        // +todo
        // add new posts to storage instance      

        // Ask backend instance to process
        // new posts
        this.backendService.processNewPosts(posts);

        // Update latestPost in storage database
        this.storageService.updateLatestPost(posts[0]);
      };
    } catch(error) {
      console.log("error in scrapper process:");
      console.log(error);
    };

    // Updating scrapper status
    this.working = false;
  };
};