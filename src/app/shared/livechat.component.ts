import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvService } from '../env';

@Component({
    selector: 'sg-livechat-button',
    templateUrl: './livechat.component.html',
    styleUrls: ['./livechat.component.scss'],
})
export class LivechatComponent {

    constructor(private modalService: NgbModal,
                private envService: EnvService){ }

    @ViewChild('livechatmodal', { static: true }) serviceCallConfirmationModal;

    openmodal() : void{
        this.modalService.open(this.serviceCallConfirmationModal, {
            windowClass : "livechatModalClass"
        });
    }

    redirectToLiveChat(){
        window.open(this.envService.get().livechaturl, '_blank');
    }
}