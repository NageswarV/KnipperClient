import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
import { BusySpinner } from '../common/busy-spinner';
import { TimeFrameOptions } from './activity-model';
var GeneralActivitiesComponent = /** @class */ (function (_super) {
    __extends(GeneralActivitiesComponent, _super);
    function GeneralActivitiesComponent(serviceClient) {
        var _this = _super.call(this) || this;
        _this.serviceClient = serviceClient;
        _this.timeFrameSelected = "QUARTERLY";
        return _this;
    }
    Object.defineProperty(GeneralActivitiesComponent.prototype, "getButtonWidth", {
        get: function () {
            var numberOfButtons = this.dtpActivity ? 3 : 2;
            return 100 / numberOfButtons;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GeneralActivitiesComponent.prototype, "transactionLink", {
        get: function () {
            return this.dtpActivity ? '' : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GeneralActivitiesComponent.prototype, "disableRightArrow", {
        get: function () {
            return this.orderMetrics &&
                this.orderMetrics.startTime <= new Date() &&
                this.orderMetrics.endTime >= new Date();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GeneralActivitiesComponent.prototype, "disableLeftArrow", {
        get: function () {
            return false;
            // this.orderMetrics && 
            //     this.orderMetrics.metrics[0].previousPeriod.startDate;
        },
        enumerable: false,
        configurable: true
    });
    GeneralActivitiesComponent.prototype.ngOnInit = function () {
        this.getData(new Date());
    };
    GeneralActivitiesComponent.prototype.getNextSet = function () {
        this.getData(this.orderMetrics.metrics[0].currentPeriod.endDate);
    };
    GeneralActivitiesComponent.prototype.getPrevSet = function () {
        this.getData(this.orderMetrics.metrics[0].previousPeriod.startDate);
    };
    GeneralActivitiesComponent.prototype.changeTimeFrame = function (value) {
        this.timeFrameSelected = value;
        this.getData(new Date());
    };
    GeneralActivitiesComponent.prototype.checkIfError = function (transaction) {
        var errors = ['Lost In Transit'];
        return !!errors.find(function (x) { return x === transaction.orderStatus; }) && this.dtpActivity;
    };
    GeneralActivitiesComponent.prototype.checkIfWarning = function (transaction) {
        var warnings = ['Returns', 'Exceptions'];
        return !!warnings.find(function (x) { return x === transaction.orderStatus; }) && this.dtpActivity;
    };
    GeneralActivitiesComponent.prototype.getData = function (dateRange) {
        var _this = this;
        if (this.dtpActivity) {
            this.setBusySpinner(this.serviceClient.getOrderMetrics(this.timeFrameSelected, new Date(dateRange.setHours(15))), 'dtp').subscribe(function (x) {
                _this.orderMetrics = x;
            });
        }
        else {
            this.setBusySpinner(this.serviceClient.getOrderMetrics2(this.timeFrameSelected, new Date(dateRange.setHours(15))), 'hc').subscribe(function (x) {
                _this.orderMetrics = x;
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", TimeFrameOptions)
    ], GeneralActivitiesComponent.prototype, "timeFrameFilterOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GeneralActivitiesComponent.prototype, "timeFrameDesc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GeneralActivitiesComponent.prototype, "transactionDetailDesc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GeneralActivitiesComponent.prototype, "dtpActivity", void 0);
    GeneralActivitiesComponent = __decorate([
        Component({
            selector: 'sg-general-activities',
            templateUrl: './general-activities.component.html',
            styleUrls: ['./general-activities.component.scss'],
        }),
        __metadata("design:paramtypes", [ServiceClient])
    ], GeneralActivitiesComponent);
    return GeneralActivitiesComponent;
}(BusySpinner));
export { GeneralActivitiesComponent };
//# sourceMappingURL=general-activities.component.js.map