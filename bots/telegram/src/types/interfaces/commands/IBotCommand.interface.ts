import { Context } from "grammy";

// Exporting IBotCommand interface
export class IBotCommand {
  public pattern: RegExp;
  public run: (ctx: Context) => any | void;
};