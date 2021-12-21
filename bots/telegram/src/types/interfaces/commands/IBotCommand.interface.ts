import { Context } from "grammy";

// Exporting IBotCommand interface
export class IBotCommand {
  // +todo remove pattern
  public pattern: RegExp;

  public command?: string;
  public display?: boolean;
  public description?: string;

  public run: (ctx: Context) => Promise<any | void>;
};