import { ErrorType } from "../enums/Errors";

export class Error {
  // Properties
  public error: boolean;
  public type: ErrorType;
  public message?: string;

  // Constructor
  constructor(type: ErrorType, message?: string) {
    this.error = true
    this.type = type;
    
    // ErrorType - TIMEDOUT
    if (type == ErrorType.TIMEDOUT) {
      this.message = 'Timedout request.'
    };

    if (message) this.message += ` ${message}`;
  };
};