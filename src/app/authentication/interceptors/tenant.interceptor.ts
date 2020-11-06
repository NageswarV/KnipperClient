import { AuthenticationService } from '../authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { TenantService } from '../../tenant/tenant.service';
import { EnvService } from '../../env/env.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  private abpTenantHeaderName = 'Abp.TenantId';
  private abpLocalizationHeaderName = 'Abp.Localization.CultureName';

  constructor(private tenantService: TenantService,
    private envService: EnvService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // If you are calling an outside domain then do not add the token.
    //if (!req.url.match(/www.mydomain.com\//)) {
    //  return next.handle(req);
    //}
    if (this.tenantService.currentTenantId != undefined) {
      const tenantReq = req.clone({
        setHeaders: {
          'Abp.TenantId': this.tenantService.currentTenantId,
          'Abp.Localization.CultureName': this.envService.languageCode,
        }
      });
      return next.handle(tenantReq);
    }
    else {
      const tenantReq = req.clone({
        setHeaders: {
          'Abp.Localization.CultureName': this.envService.languageCode
        }
      });
      return next.handle(tenantReq);
    }
  }
}
