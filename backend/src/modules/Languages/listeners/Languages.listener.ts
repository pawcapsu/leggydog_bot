import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as Languages from 'src/languages';

@Controller()
export class LanguagesListener {
  // languages::fetchAll
  @MessagePattern('languages::fetchAll')
  public fetchAllLanguages() {
    return [...Object.values(Languages)];
  };
};