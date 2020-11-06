import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { EnvService } from './env';
import { CacheService } from './cache';
var AppComponent = /** @class */ (function () {
    function AppComponent(cacheService, sanitizer, router, envService) {
        var _this = this;
        this.cacheService = cacheService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.envService = envService;
        this.router.events.subscribe(function (event) {
            if ((event instanceof NavigationEnd) && (_this.envService.get().allowAnalytics === 'true')) {
                gtag('config', _this.envService.get().analyticsToken, {
                    'page_path': event.urlAfterRedirects
                });
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.themeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cacheService.tenantInfo.themeUrl);
    };
    AppComponent = __decorate([
        Component({
            selector: 'sg-body',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [CacheService,
            DomSanitizer,
            Router,
            EnvService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map