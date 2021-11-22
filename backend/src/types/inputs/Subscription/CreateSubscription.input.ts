// Importing types
import { ESubscriptionSourceType, ESubscriptionConsumerType } from 'src/types';

// Exporting E621-specific Details input
export interface ESixDetailsInput {
  source: {
    type: ESubscriptionSourceType.E621,
    tags: string[]
  }
};

// Only for testing purposes
// Exporting Something Another Details input
export interface TestDetailsInput {
  source: {
    type: ESubscriptionSourceType.TEST,
    test: boolean
  }
};

// Exporting BasicSubscription input
export interface BasicSubscriptionInput {
  consumer: {
    type: ESubscriptionConsumerType,
    identifier: string,
  }

  source: {
    type: ESubscriptionSourceType,
  }
};

// Exporting CreateSubscription input
export type CreateSubscriptionInput = 
  BasicSubscriptionInput & ESixDetailsInput 
  | BasicSubscriptionInput & TestDetailsInput;