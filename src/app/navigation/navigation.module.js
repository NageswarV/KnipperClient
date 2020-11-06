import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                CommonModule,
                BrowserModule
            ],
            declarations: [
                NavigationComponent
            ],
            exports: [
                NavigationComponent
            ]
        })
    ], NavigationModule);
    return NavigationModule;
}());
export { NavigationModule };
//# sourceMappingURL=navigation.module.js.map