/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { UnAuthorizedInterceptor } from './unauthorized-response.interceptor';
import { TenantInterceptor } from './tenant.interceptor';
import { CachingInterceptor } from './caching.interceptor';
import { ValidationInterceptor } from './validation.interceptor';
/** Http interceptor providers in outside-in order */
export var httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ValidationInterceptor, multi: true },
];
//# sourceMappingURL=index.js.map