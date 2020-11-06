import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvService } from '../env';
var LivechatComponent = /** @class */ (function () {
    function LivechatComponent(modalService, envService) {
        this.modalService = modalService;
        this.envService = envService;
    }
    LivechatComponent.prototype.openmodal = function () {
        this.modalService.open(this.serviceCallConfirmationModal, {
            windowClass: "livechatModalClass"
        });
    };
    LivechatComponent.prototype.redirectToLiveChat = function () {
        window.open(this.envService.get().livechaturl, '_blank');
    };
    __decorate([
        ViewChild('livechatmodal', { static: true }),
        __metadata("design:type", Object)
    ], LivechatComponent.prototype, "serviceCallConfirmationModal", void 0);
    LivechatComponent = __decorate([
        Component({
            selector: 'sg-livechat-button',
            templateUrl: './livechat.component.html',
            styleUrls: ['./livechat.component.scss'],
        }),
        __metadata("design:paramtypes", [NgbModal,
            EnvService])
    ], LivechatComponent);
    return LivechatComponent;
}());
export { LivechatComponent };
//# sourceMappingURL=livechat.component.js.map