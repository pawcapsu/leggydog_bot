import { Injectable, Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as fflate from 'fflate';
import * as csv from 'csvtojson';
import { unzip, deflate, unzipSync } from 'zlib';

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
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    
    // Posts download
    if (type == 'Posts') {
      const filename = `posts-${date}`;

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

      // Unpacking this file
      const unzipped = fflate.gunzipSync(fs.readFileSync(`./exports/${filename}.csv.gz`));
      this.logger.warn('File decompressed. Waiting 10 seconds and then proceeding...');

      await new Promise((resolve) => {
	      setTimeout(() => { 
		      resolve({}) 
	      }, 10000)
      });

      // Decoding
      this.logger.warn(`Decoding file string with ${unzipped.length} length`);
      const fileString = new TextDecoder().decode(unzipped);

      this.logger.warn(`Decoding complete. Waiting 10 seconds to parse csv...`);
      await new Promise((resolve) => {
	      setTimeout(() => { 
		      resolve({}) 
	      }, 10000)
      });
      fileString.slice(0, fileString.indexOf('id'));

      // Parsing CSV
      const posts = await csv()
        .fromString(fileString);
        
      this.logger.warn(`Unzipped and parsed csv file. Posts length: ${posts.length}`);      
    };
  };
};
