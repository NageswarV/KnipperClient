import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var FooterComponent = /** @class */ (function () {
    function FooterComponent(serviceClient) {
        this.serviceClient = serviceClient;
        this.mimicBasic = false;
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.currentDate = new Date();
        this.isHidden = true;
    };
    FooterComponent = __decorate([
        Component({
            selector: 'sg-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.scss']
        }),
        __metadata("design:paramtypes", [ServiceClient])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map