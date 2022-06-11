import { Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(ScrapperService.name);
  
  // Scrapper status
  public working: boolean = false;

  // public process
  // - Start scrapping process
  public async process() {
    this.logger.debug('Start scrapping process');

    // Changing scrapper status
    this.working = true;

    try {
      let latestPost: IPost = await this.storageService.getLatestPost();
      this.logger.debug('Got latest post from Storage Service:', latestPost);

      // Checking if we have latest post information
      // or no
      if (!latestPost?.id) {
        this.logger.warn('Latest post not found in Storage Service.');

        // Getting latest post from E621
        latestPost = await this.postsService.fetchOne([]);
        
        // Updating information about latest post in storage
        await this.storageService.updateLatestPost(latestPost);

        this.logger.debug('New latest post:', latestPost);

        // Waiting 5 seconds to not violate E621 request limit
        await (new Promise((resolve) => setTimeout(() => resolve(null), 5000)));
      };

      // Getting new posts
      const posts = await this.postsService.fetchMany([], 10, { page: `a${latestPost.id}` });

      this.logger.debug('Got new posts from Posts Service:', posts);

      if (posts.length > 0) {
        // +todo
        // add new posts to storage instance      
        
        // Ask backend instance to process
        // new posts
        this.logger.debug('Asking Backend Service to process new posts');
        this.backendService.processNewPosts(posts);

        // Update latestPost in storage database
        this.logger.debug('Asking Storage Service to store last post');
        this.storageService.updateLatestPost(posts[0]);
      };
    } catch(error) {
      this.logger.warn('Error in scrapper process:', error);
    };

    // Updating scrapper status
    this.working = false;
    this.logger.debug('Scrapping process end.');
  };
};