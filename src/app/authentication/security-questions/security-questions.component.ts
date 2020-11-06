import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidationService, Message } from '../../validation';
import { AuthenticationService } from './../authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from '../../shared/utility.service';
import { TranslationService } from 'angular-l10n';
import { BusySpinner } from './../../common/busy-spinner';

@Component({
  selector: 'security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss']
})
export class SecurityQuestionsComponent extends BusySpinner implements OnInit {
  componentId: string;
  @Input() securityQuestions: any[] = [];
  step2SectionTitle: string = '';
  @Output() emitAreAnswersValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  securityAnswersForm: FormGroup;
  wrongAnswersMessage: string = "Incorrect answers. Please try again.";
  attempts: number = 0;
  accountLockoutMessage: string = "Account locked. Please try again after 20 minutes";
  @Input() hasUserForgottenPassword: boolean = false;
  @ViewChild('confirmation', { static: true }) OpenConfirmationModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private utilityService: UtilityService,
    private translationService: TranslationService) {
    super();
    this.componentId = performance.now().toString();
  }

  get securityAnswers(): FormArray {
    return this.securityAnswersForm.get('securityAnswers') as FormArray;
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.securityAnswersForm = this.formBuilder.group({
      securityAnswers: this.formBuilder.array(this.buildSecurityAnswers(3))
    });

    this.step2SectionTitle = this.hasUserForgottenPassword ? this.translationService.translate('hcpportal-password-forgot-step2-section-title')
      : this.translationService.translate('hcpportal-username-forgot-step2-section-title');
  }

  buildSecurityAnswers(count: number): FormGroup[] {
    let controls: FormGroup[] = [];
    for (let i = 0; i < count; i++) {
      controls.push(this.formBuilder.group({
        securityAnswer: ['', Validators.required]
      }))
    }
    return controls;
  }

  navigateToLogin() {
    this.router.navigateByUrl("/login");
  }

  onSubmit(): void {
    this.validationService.clearMessage(this.componentId);
    let userAnswers = this.securityAnswersForm.value.securityAnswers;
    this.emitAreAnswersValid.emit(true);
  }

  openConfirmationModal(): void {
    this.modalService.open(this.OpenConfirmationModal, this.utilityService.modalOption);
  }
}
