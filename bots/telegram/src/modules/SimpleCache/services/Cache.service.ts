import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  // Cached variables
  public cache = {};

  // public get
  public get(key) {
    return this.cache[key];
  };

  // public set
  public set(key: string, value: any) {
    this.cache[key] = value;
  };
};