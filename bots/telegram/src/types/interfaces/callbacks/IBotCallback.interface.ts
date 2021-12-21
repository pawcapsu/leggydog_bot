import { Context } from "grammy";

// Exporting IBotCommand interface
export class IBotCallback {
  public pattern: RegExp;
  public run: (ctx: Context) => Promise<any | void>;
};