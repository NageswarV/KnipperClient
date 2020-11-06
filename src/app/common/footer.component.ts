import { Component, OnInit } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
import { Permissions } from '../../generated/permission-set';

@Component({
    selector: 'sg-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    currentDate: Date;
    privacyPolicyLink: string;
    safeSecureLink: string;
    isHidden: boolean;
    mimicBasic: boolean = false;

    constructor(
        private serviceClient: ServiceClient) { }

    ngOnInit(): void {
        this.currentDate = new Date();
        this.isHidden = true;
    }

}
