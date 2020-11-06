import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
  ) { }

  handleError(error: Error) {
    console.log(error);
    throw error;
    // TODO Update with Samplicity Logging Strategy
  }
}
