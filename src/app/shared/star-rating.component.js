import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.maxScore = 5;
        this.forDisplay = false;
        this.rateChanged = new EventEmitter();
        this.range = [];
        this.marked = -1;
        this.mark = function (index) {
            _this.marked = _this.marked == index ? index - 1 : index;
            _this.score = _this.marked + 1;
            _this.rateChanged.next(_this.score);
        };
        this.isMarked = function (index) {
            if (!_this.forDisplay) {
                if (index <= _this.marked) {
                    return 'fa-star';
                }
                else {
                    return 'fa-star-o';
                }
            }
            else {
                if (_this.score >= index + 1) {
                    return 'fa-star';
                }
                else if (_this.score > index && _this.score < index + 1) {
                    return 'fa-star-half-o';
                }
                else {
                    return 'fa-star-o';
                }
            }
        };
    }
    StarRatingComponent.prototype.ngOnInit = function () {
        for (var i = 0; i < this.maxScore; i++) {
            this.range.push(i);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StarRatingComponent.prototype, "score", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StarRatingComponent.prototype, "maxScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StarRatingComponent.prototype, "forDisplay", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], StarRatingComponent.prototype, "rateChanged", void 0);
    StarRatingComponent = __decorate([
        Component({
            selector: 'sg-star-rating',
            templateUrl: './star-rating.component.html',
            styleUrls: ['./star-rating.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());
export { StarRatingComponent };
//# sourceMappingURL=star-rating.component.js.map