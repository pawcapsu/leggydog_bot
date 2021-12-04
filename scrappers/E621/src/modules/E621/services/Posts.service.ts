import { Injectable } from '@nestjs/common';
import { IPost, IUnserializedPost } from 'types';
import axios from 'axios';

@Injectable()
export class PostsService {
  // fetchOne
  public async fetchOne(
    tags: Array<string>,
    options?: {
      page?: string,
    },
  ): Promise<IPost> {
    const many = await this.fetchMany(tags, 1, options);
    return many[0];
  };

  // fetchMany
  public async fetchMany(
    tags: Array<string>, 
    limit = 10,
    options?: {
      page?: string,
    },
  ): Promise<Array<IPost>> {
    const request = await axios.get(
      `https://e621.net/posts.json?tags=${tags.join('+')}`,
      {
        headers: {
          "User-Agent": "LeggydogBot/1.0 (@SniperFox213 on github)",
        },
        params: {
          limit,
          page: options?.page ?? null,
        },
      }
    );

    const posts: Array<IUnserializedPost> = request.data?.posts;

    return posts.map((post) => {
      return this._serialize(post);
    });
  };

  // _serialize
  public _serialize(post: IUnserializedPost): IPost {
    return <IPost>{
      id: String(post.id),
      file_url: post.file.url,
      preview_url: post.preview.url,
      sample_url: post.sample.url,
      description: post.description,
      tags: [ 
        ...post.tags.general, 
        ...post.tags.artist,
        ...post.tags.character,
        ...post.tags.invalid,
        ...post.tags.lore,
        ...post.tags.meta,
        ...post.tags.species,
      ],
    };
  };
};