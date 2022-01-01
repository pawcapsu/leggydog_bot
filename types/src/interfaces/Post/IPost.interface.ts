import { IPostFile } from ".";

// Exporting IPost interface
export interface IPost {
  id: string;
  file_url: IPostFile;
  preview_url: IPostFile;
  sample_url: IPostFile;
  description: string;
  tags: Array<string>;
};