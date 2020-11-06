import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { ValidationService } from '../validation';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../common/busy-spinner';

const IMAGES: string[] = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];

@Component({
  selector: 'sg-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./login.component.scss']
})
export class PasswordResetComponent extends BusySpinner implements OnInit {
  images: string[] = IMAGES;
  isExpiredPassword: boolean;
  linkSent: boolean;
  linkHasExpired: boolean;
  email: string;
  resetToken: string;
  timestamp: string;
  newPassword: string;
  oldPassword: string;
  newPasswordVisible: boolean;
  oldPasswordVisible: boolean;
  minCharactersPass: boolean;
  containPartsPass: boolean;
  includesFromGroupsPass: boolean;
  lowercaseLettersPass: boolean;
  uppercaseLettersPass: boolean;
  numbersPass: boolean;
  specialCharactersPass: boolean;
  oldPasswordError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private validationService: ValidationService) {

    super();
    this.containPartsPass = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['emailAddress'];
      this.resetToken = params['resetToken'];
      this.timestamp = params['timestamp'];
      this.isExpiredPassword = params['expired'];

      this.resetToken = this.resetToken.replace(/ /g, '+');;
      if (!this.isExpiredPassword) {
        // this.setBusySpinner(this.authenticationService.validateUserPasswordResetToken(this.email, this.resetToken)).subscribe(x => {
        //   this.linkHasExpired = !x;
        // }, e => {
        //   this.validationService.clearMessage('global');
        //   this.validationService.validate(e, 'global');

        //   window.scrollTo(0, 0);
        // });
      }
    });
  }

  toggleVisible(isNew: boolean) {
    if (isNew) {
      this.newPasswordVisible = !this.newPasswordVisible;
    } else {
      this.oldPasswordVisible = !this.oldPasswordVisible;
    }
  }

  oldPasswordChanged() {
    this.oldPasswordError = false;
  }

  validateRules() {
    if (!this.newPassword) {
      return;
    }

    this.minCharactersPass = this.newPassword.length > 7;
    this.lowercaseLettersPass = (/[a-z]/.test(this.newPassword));
    this.uppercaseLettersPass = (/[A-Z]/.test(this.newPassword));
    this.numbersPass = (/[0-9]/.test(this.newPassword));
    this.specialCharactersPass = (/[~`:?,!@#\$%\^\&*\)\(+=._-]/.test(this.newPassword));
    this.includesFromGroupsPass =
      (this.lowercaseLettersPass ? 1 : 0) + (this.uppercaseLettersPass ? 1 : 0) + (this.numbersPass ? 1 : 0) + (this.specialCharactersPass ? 1 : 0) > 2;

    let partsFound = false;
    if (this.newPassword.length > 2) {
      for (let i = 0; i < this.email.length - 2; i++) {
        partsFound = this.newPassword.indexOf(this.email.substr(i, 3)) !== -1;
        if (partsFound) {
          break;
        }
      }
    }
    this.containPartsPass = !partsFound;
  }

  submitHandler() {
    if (this.isExpiredPassword) {
      this.validationService.clearMessage('global');

      // this.setBusySpinner(this.authenticationService.renewExpiredUserPassword(this.email, this.oldPassword, this.newPassword)).subscribe(x => {
      //   this.linkSent = true;
      // }, e => {
      //   const errors = this.validationService.getServerErrors(e);
      //   if (errors.length > 0) {
      //     if (errors[0] === 'WrongOldPassword') {
      //       this.oldPasswordError = true;
      //     } else {
      //       this.validationService.error(errors[0]);

      //       window.scrollTo(0, 0);
      //     }
      //   }
      // });
    } else {
      // this.setBusySpinner(this.authenticationService.resetUserPassword(this.email, this.resetToken, this.newPassword)).subscribe(x => {
      //   this.linkSent = true;
      // }, e => {
      //   this.validationService.clearMessage('global');
      //   this.validationService.validate(e, 'global');
      //   window.scrollTo(0, 0);
      // });
    }
  }

  navigateToLogin() {
    this.router.navigateByUrl("/login");
  }
}
