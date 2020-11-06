import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from '../shared/utility.service';

import { AuthenticationService } from './authentication.service';
import { ValidationService } from '../validation';
import { TenantService } from '../tenant';
import { BusySpinner } from '../common/busy-spinner';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

const IMAGES: string[] = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];

@Component({
    selector: 'sg-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./login.component.scss']
})
export class PasswordForgotComponent extends BusySpinner implements OnInit{
    @ViewChild('inUserName', { static: false }) userNameInput: ElementRef;
    @ViewChild('confirmation', { static: true }) OpenConfirmationModal: any;
    images: string[] = IMAGES;
    linkSent: boolean;
    email: string;
    securityQuestions: any[];
    componentId: string;
    forgotPasswordForm: FormGroup;
    activeStep: number;
    pageTitle: string;
    headerText: string;
    sectionTitle: string;
    sectionLabel: string;
    step3SectionTitle: string;
    isNovoClient: boolean = false;
    data: any[];
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private validationService: ValidationService,
        private tenantService: TenantService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private utilityService: UtilityService
    ) {
        super();
        this.linkSent = false;
        this.componentId = performance.now().toString();
        this.data=[{
            securityQuestionText:"What is your favourite movie ?"
        },
        {
            securityQuestionText:"What is your mother's maiden name ?"
        },
        {
            securityQuestionText:"What is your favourite food ?"
        }
        ]
    }
    ngOnInit() {
        this.initializeForm();
        this.setActiveStep(1);
    }
    
    initializeForm() {
        this.forgotPasswordForm = this.formBuilder.group({
            username: ['', [Validators.required]]
        });
    }


    recordResponseFromStep2(event: boolean): void {
        if (event) {
            //this.step3SectionTitle = this.translationService.translate('hcpportal-password-forgot-step3-section-title');
            this.setActiveStep(3);
        }
    }

    setActiveStep(step: number): void {
        this.activeStep = step;
    }
    onSubmit() {
        this.validationService.clearMessage(this.componentId);
        // this.setBusySpinner(this.authenticationService.getSecurityQuestionsByUsername(this.forgotPasswordForm.value.username)).subscribe(data => {
        //     if (data.isClientAdmin) {
        //         this.step3SectionTitle = this.translationService.translate('hcpportal-password-forgot-step2-section-title');
        //         this.setActiveStep(3);
        //     }
        //     else {
        //         this.securityQuestions = data.hcpSecurityQuestions;
        //         this.setActiveStep(2);
        //     }
        // }, e => {
        //     this.validationService.validate(e, this.componentId);
        // });
        this.securityQuestions = this.data;
        this.setActiveStep(2);
    }

    navigateToLogin() {
        this.router.navigateByUrl("/login");
    }
    openConfirmationModal(): void {
        this.modalService.open(this.OpenConfirmationModal, this.utilityService.modalOption);
      }
}
