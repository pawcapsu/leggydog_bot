import { Injectable, Logger } from '@nestjs/common';
import { DatabaseFilesService } from 'src/modules/ExternalDatabase/services/E621';

@Injectable()
export class PostsTableService {
  private readonly logger = new Logger(PostsTableService.name);
  constructor(
    private readonly filesService: DatabaseFilesService,
  ) {}

  // State variables
  public processing: boolean = false;

  // public update
  public async update() {
    // Checking current service state
    if (this.processing) {
      return;
    };
    this.processing = true;
    
    this.logger.warn('Starting PostsTable update...');

    // Downloading posts file
    const posts = await this.filesService.download('Posts');


    // Updating processing state
    // this.processing = false;
  };
};