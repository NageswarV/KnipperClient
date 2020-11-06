import { __decorate, __metadata } from "tslib";
import { timer as observableTimer, Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import 'rxjs/Rx';
import { EnvService } from './env.service';
var EnvModule = /** @class */ (function () {
    function EnvModule(envService) {
        var currentAppVersion = envService.get().appVersion;
        var environmentCheckingTimer = observableTimer(30 * 60 * 1000, 30 * 60 * 1000).subscribe(function () {
            Observable.ajax('/build.json').subscribe(function (x) {
                if (x.status === 200) {
                    if (x.response &&
                        x.response.appVersion &&
                        x.response.appVersion != currentAppVersion) {
                        envService.reloadApp();
                    }
                }
                else {
                    environmentCheckingTimer.unsubscribe();
                }
            }, function (x) {
                environmentCheckingTimer.unsubscribe();
            });
        });
    }
    EnvModule = __decorate([
        NgModule({
            providers: [
                EnvService
            ]
        }),
        __metadata("design:paramtypes", [EnvService])
    ], EnvModule);
    return EnvModule;
}());
export { EnvModule };
//# sourceMappingURL=env.module.js.map