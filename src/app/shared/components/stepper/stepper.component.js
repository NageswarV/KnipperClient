import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ClassificationService } from '../../../core/classification.service';
var StepperComponent = /** @class */ (function () {
    function StepperComponent(classificationService) {
        this.classificationService = classificationService;
        this.steps = [];
    }
    StepperComponent.prototype.ngOnInit = function () {
        this.setSteps();
    };
    StepperComponent.prototype.ngOnChanges = function (changes) {
        this.setSteps();
    };
    StepperComponent.prototype.setCurrent = function () {
        var _this = this;
        this.steps.forEach(function (step, index) {
            if (index === 0 && _this.steps[_this.steps.length - 1].status === 3 && _this.steps[index + 1].status === 3) {
                _this.currentStatus = index;
            }
            else if (step.status !== 3 && index === _this.steps.length - 1) {
                _this.currentStatus = index;
                // tslint:disable-next-line:max-line-length
            }
            else if (index > 0 && index < _this.steps.length && _this.steps[index - 1].status !== 3 && step.status !== 3 && _this.steps[index + 1].status === 3) {
                _this.currentStatus = index;
            }
        });
    };
    StepperComponent.prototype.setSteps = function () {
        this.steps = this.stepHeaders.map(function (step) {
            return {
                name: step.classificationValueName,
                status: step.status
            };
        });
        this.setCurrent();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StepperComponent.prototype, "stepHeaders", void 0);
    StepperComponent = __decorate([
        Component({
            selector: 'samplicity-stepper',
            templateUrl: './stepper.component.html',
            styleUrls: ['./stepper.component.scss']
        }),
        __metadata("design:paramtypes", [ClassificationService])
    ], StepperComponent);
    return StepperComponent;
}());
export { StepperComponent };
//# sourceMappingURL=stepper.component.js.map