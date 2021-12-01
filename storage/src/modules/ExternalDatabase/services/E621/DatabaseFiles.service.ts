import { Injectable, Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as csv from 'csvtojson';

const gunzip = require('gunzip-file');
const Downloader = require('nodejs-file-downloader');

@Injectable()
export class DatabaseFilesService {
  private readonly logger = new Logger('E621DatabaseFilesService');

  // public download
  public async download(type: 'Posts') {
    // Global variables
    const url = 'https://e621.net/db_export';

    // - current date
    const currentDate = new Date();
    // {year}-{month}-{date}
   
    // +todo
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-0${currentDate.getDate()}`;
    
    // Posts download
    if (type == 'Posts') {
      const filename = `pools-${date}`;

      const downloader = new Downloader({
        url: `${url}/${filename}.csv.gz`,
        directory: "./exports",
        onProgress: (percetange) => {
          if (percetange % 5 == 0)
            this.logger.log(`Downloading posts file... (${percetange}/100%)`);
        },
      });

      // Starting download
      try {
        await downloader.download();
      } catch (error) {
        this.logger.error('Download failed');
        console.log(error);
      };

      // Unzipping
      this.logger.warn(`Unzipping ${filename}.csv.gz...`);
      gunzip(`./exports/${filename}.csv.gz`, './exports/posts.csv');

      // Parsing as csv
      const posts = await csv().fromFile(`./exports/posts.csv`);

      this.logger.warn(`Loaded ${posts.length} posts. Waiting 10 second and then starting database update process...`);
    };
  };
};
