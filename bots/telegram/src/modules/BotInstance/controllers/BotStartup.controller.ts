import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { BotInstanceService } from "src/modules/BotInstance/services";

@Injectable()
export class BotStartupController implements OnApplicationBootstrap {
  constructor(private instance: BotInstanceService) {};
  
  // bot startup
  async onApplicationBootstrap() {
    this.instance.start();
  };
};