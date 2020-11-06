import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { ValidationService } from '../../validation/validation.service';
import { NotifyService } from '../../shared/notify.service';

@Injectable()
export class ValidationInterceptor implements HttpInterceptor {
    constructor(private validationService: ValidationService,
        private notifyService: NotifyService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let ok: HttpResponse<any>;
        let errorHandled = false;
        let errorResponse: any;

        // extend server response observable with logging
        return next.handle(req)
            .pipe(
                tap(
                    //// Succeeds when there is a response; ignore other events
                    //event => ok = event instanceof HttpResponse ? event : null,
                    //// Operation failed; error is an HttpErrorResponse
                    //error => ok = error
                    (r: HttpResponse<any>) => {
                        this.validationService.clearMessage('global');
                    },
                    async (e: HttpErrorResponse) => {
                        errorHandled = false;
                        if (typeof e.error != "string") {
                            var a = await e.error.text();
                            errorResponse = JSON.parse(a);
                            errorResponse.status = e.status;
                        }

                        if (!this.isUserFriendlyError(errorResponse) && !this.isValidationError(errorResponse)) {
                            this.handleStatusError(e);
                            errorHandled = true;
                        }
                    }
                )
            );
    }

    private isUserFriendlyError(e: HttpErrorResponse): boolean {
        if (e.status === 500) {
            try {
                if (e && e.error && e.error.code === 400) {
                    return true;
                }
            } catch (ex) {
                // Do nothing
            }
            return false;
        }
    }

    private isValidationError(e: HttpErrorResponse): boolean {
        if (e.status === 400) {
            try {
                if (e && e.error && e.error.validationErrors) {
                    return true;
                }
            } catch (ex) {
                // Do nothing
            }
            return false;
        }
    }

    private handleStatusError(e: HttpErrorResponse) {
        if (e && e.status === 403) {
            this.validationService.forbidPage();
        } else if (e.status) {
            this.notifyService.info({
                title: 'repportal-system-errormessage',
                text: 'repportal-system-contactsupport',
                cornerclass: 'transparent-style'                
            });
        }
        else {
            this.notifyService.error({
                title: 'repportal-system-errormessage',
                text: 'repportal-system-cannotconnect'
            });
        }
    }
}
