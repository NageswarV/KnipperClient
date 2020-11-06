import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidationModule } from '../validation';
import { LocalizationModule } from 'angular-l10n';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login.component';
import { LoginCarouselComponent } from './login-carousel.component';
import { PasswordForgotComponent } from './password-forgot.component';
import { PasswordResetComponent } from './password-reset.component';
import { ForbiddenComponent } from './forbidden.component';
import { UnderMaintenanceComponent } from './under-maintenance.component';
import { NgBusyModule } from 'ng-busy';
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ValidationModule,
                LocalizationModule,
                RouterModule,
                NgBusyModule
            ],
            declarations: [
                LoginComponent,
                LoginCarouselComponent,
                PasswordForgotComponent,
                PasswordResetComponent,
                ForbiddenComponent,
                UnderMaintenanceComponent
            ],
            providers: [
                AuthenticationService
            ],
            exports: []
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());
export { AuthenticationModule };
//# sourceMappingURL=authentication.module.js.map