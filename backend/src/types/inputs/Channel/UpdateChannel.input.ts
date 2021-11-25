import { ELanguageType, EChannelActionType } from "src/types";

// Exporting UpdateChannel input
export interface UpdateChannelInput {
  language?: ELanguageType,
  action?: {
    type: EChannelActionType
    data?: any,
  },
};