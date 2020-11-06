import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
import { SecurityQuestionsComponent } from './security-questions/security-questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ValidationModule,
    LocalizationModule,
    RouterModule,
    NgBusyModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    LoginCarouselComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    ForbiddenComponent,
    UnderMaintenanceComponent,
    SecurityQuestionsComponent
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthenticationModule { }
