import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { TranslationService } from 'angular-l10n';

import { ApiException } from '../../generated/service-client';

@Injectable()
export class ValidationService implements OnDestroy {
  private validationMessageSubject: Subject<Message>;
  private clearEventSubject: Subject<string>;
  isFormDirty: () => void;
  isAocDirty: () => void;

  stickySuccess: boolean;
  stickyWarning: boolean;
  stickyError: boolean;

  constructor(
    private translationService: TranslationService,
    private router: Router
  ) {
    this.validationMessageSubject = new Subject<Message>();
    this.clearEventSubject = new Subject<string>();
  }

  forbidPage(): void {
    this.router.navigate(['/forbidden']);
  }

  addMessage(message: Message) {
    setTimeout(() => this.validationMessageSubject.next(message), 0);
  }

  clearMessage(componentId: string) {
    setTimeout(() => this.clearEventSubject.next(componentId));
  }

  success(messageCode: string, componentId?: string, ...propertyName: string[]): void {
    if (!this.stickySuccess) {
      this.clearMessage(componentId);
    }
    this.addMessage(this.createMessage(MessageType.SUCCESS, messageCode, componentId, propertyName));
  }

  error(messageCode: string, componentId?: string, ...propertyName: string[]): void {
    this.addMessage(this.createMessage(MessageType.ERROR, messageCode, componentId, propertyName));
  }

  warning(messageCode: string, componentId?: string, ...propertyName: string[]): void {
    this.addMessage(this.createMessage(MessageType.WARNING, messageCode, componentId, propertyName));
  }

  validate(exception: ApiException, componentId: string): void {
    const result = JSON.parse(exception.response);
    if (result.error.validationErrors) {
      result.error.validationErrors.forEach(x => {
        this.error(x.message, componentId, x.members);
      });
    } else if (result.error.message) {
      this.error(result.error.message, componentId);
    }
  }

  getServerErrors(exception: ApiException): string[] {
    const result = [];
    const response = JSON.parse(exception.response);
    if (response.error.validationErrors) {
      response.error.validationErrors.forEach(x => {
        result.push(x.message);
      });
    } else if (response.error.message) {
      result.push(response.error.message);
    }
    return result;
  }

  private createMessage(messageType: MessageType, messageCode: string, componentId?: string, propertyNames?: string[]): Message {
    const message = new Message();
    message.messageType = messageType;
    message.messageCode = (this.translationService.translate(messageCode) || messageCode);
    message.componentId = componentId || 'global';
    message.propertyName = propertyNames;

    return message;
  }

  getValidationMessage(): Observable<Message> {
    return this.validationMessageSubject.asObservable();
  }

  getClearEvent(): Observable<string> {
    return this.clearEventSubject.asObservable();
  }

  getIsFormDirty(status: () => void) {
    this.isFormDirty = status;
  }

  getAocDirty(status: () => void) {
    this.isAocDirty = status;
  }

  ngOnDestroy(): void {
    this.validationMessageSubject.unsubscribe();
  }
}

export class Message {
  componentId: string;
  messageCode: string;
  messageType: MessageType;
  propertyName: string[];
}

export enum MessageType {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2
}
