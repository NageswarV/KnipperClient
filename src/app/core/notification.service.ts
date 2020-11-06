import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  private globalErrorStream = new Subject<any>();
  globalErrors$ = this.globalErrorStream.asObservable();

  handleError(error: HttpErrorResponse): void {
    this.globalErrorStream.next(error);
  }

}
