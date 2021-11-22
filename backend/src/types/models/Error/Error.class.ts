export enum ErrorType {
  INVALID_PAYLOAD = 'INVALID_PAYLOAD'
};

export class Error {
  constructor(type: ErrorType, additional?: string) {
    this.error = true;
    this.type = type;
    
    // Invalid Payload eror
    if (type == ErrorType.INVALID_PAYLOAD) {
      this.message = 'Invalid command payload.';
    };

    if (additional) this.message += ` ${additional}`;
  };

  public error: boolean;
  public type: ErrorType;
  public message?: string;
};