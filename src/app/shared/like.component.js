import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
var LikeComponent = /** @class */ (function () {
    function LikeComponent() {
        this.disLikeFlag = false;
        this.likeFlag = false;
        this.onLikeDisLikeFlagChanged = new EventEmitter();
    }
    LikeComponent.prototype.ngOnInit = function () {
    };
    LikeComponent.prototype.onToggleLike = function () {
        this.likeFlag = !this.likeFlag;
        this.disLikeFlag = false;
        this.onLikeDisLikeFlagChanged.next(this.likeFlag ? 5 : 0);
    };
    LikeComponent.prototype.onToggleDisLike = function () {
        this.disLikeFlag = !this.disLikeFlag;
        this.likeFlag = false;
        this.onLikeDisLikeFlagChanged.emit(this.disLikeFlag ? 1 : 0);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LikeComponent.prototype, "disLikeFlag", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LikeComponent.prototype, "likeFlag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LikeComponent.prototype, "onLikeDisLikeFlagChanged", void 0);
    LikeComponent = __decorate([
        Component({
            selector: 'sg-like',
            templateUrl: './like.component.html',
            styleUrls: ['./like.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], LikeComponent);
    return LikeComponent;
}());
export { LikeComponent };
//# sourceMappingURL=like.component.js.map