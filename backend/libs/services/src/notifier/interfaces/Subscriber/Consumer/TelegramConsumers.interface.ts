import { EConsumerType } from '@app/services';

// todo: +Chat type
export type ITelegramChatConsumer = {
  type: EConsumerType.TELEGRAM;
  chatId: number;
};
