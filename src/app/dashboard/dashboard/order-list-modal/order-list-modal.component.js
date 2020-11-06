import { __decorate, __metadata, __param } from "tslib";
import { Component, Input, EventEmitter, Output, Inject, Optional } from '@angular/core';
import { ClientService } from '../../../core/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { TranslationHelperService } from '../../../core/translation-helper.service';
import { OrderManagementDashboard } from '../../../shared/service-clients/om-dashboard';
import { SamplicityPermission } from '../../../common/permissions';
import { MomentDateTimePipe } from '../../../shared/pipes';
import { LocaleService } from 'angular-l10n';
var OrderListModalComponent = /** @class */ (function () {
    function OrderListModalComponent(dialogRef, fb, clientService, locale, omDashboardClient, translationHelperService, data) {
        this.fb = fb;
        this.clientService = clientService;
        this.locale = locale;
        this.omDashboardClient = omDashboardClient;
        this.translationHelperService = translationHelperService;
        this.displayCloseButton = true;
        this.close = new EventEmitter();
        this.serverValidationErrors = [];
        this.infoMessageList = [];
        this.orderListItems = [];
        this.dialogRef = dialogRef;
        this.programId = data.programId;
        this.status = data.label;
        this.orderStatusId = data.id;
        this.modalTitle = this.translationHelperService.translate('Dashboard.OrderListModal.Title').replace('{0}', this.status);
        this.tableTitle = this.translationHelperService.translate('Dashboard.OrderListModal.TableTitle')
            .replace('{0}', this.status);
    }
    OrderListModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.displayOrderStatusPastTimeThresholdList();
        this.omDashboardClient.searchOrdersPastStatusTimeThresholdDateList(this.programId, this.orderStatusId)
            .subscribe(function (response) {
            _this.orderListItems = response.result;
            _this.tableTitle = _this.tableTitle.replace('{1}', _this.orderListItems.length.toString());
        });
    };
    OrderListModalComponent.prototype.hideCloseButton = function () {
        this.displayCloseButton = false;
    };
    OrderListModalComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    OrderListModalComponent.prototype.displayOrderStatusPastTimeThresholdList = function () {
        var selectedClientId = this.clientService.getClientId();
        this.orderListColumns = [{
                name: 'orderId',
                displayName: 'Dashboard.OrderListModal.OrderNumber',
                visibility: 'xs',
                linkRoute: '/' + selectedClientId + '/orders/detail',
                linkPermission: SamplicityPermission.Order.OrdersDetailView,
                linkParam: 'id',
                linkDisplay: 'orderId',
            }, {
                name: 'orderPassedThresholdDate',
                pipe: new MomentDateTimePipe(this.translationHelperService.translationService),
                displayName: 'Dashboard.OrderListModal.DateTimePastThreshold',
                sortDir: 'asc',
                visibility: 'xs',
            }];
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OrderListModalComponent.prototype, "displayCloseButton", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OrderListModalComponent.prototype, "close", void 0);
    OrderListModalComponent = __decorate([
        Component({
            selector: 'samplicity-order-list-modal',
            templateUrl: './order-list-modal.component.html',
            styleUrls: ['./order-list-modal.component.scss'],
        }),
        __param(6, Optional()), __param(6, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            FormBuilder,
            ClientService,
            LocaleService,
            OrderManagementDashboard,
            TranslationHelperService, Object])
    ], OrderListModalComponent);
    return OrderListModalComponent;
}());
export { OrderListModalComponent };
//# sourceMappingURL=order-list-modal.component.js.map