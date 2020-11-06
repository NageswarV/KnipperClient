import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
//zrimport { Comment } from '../../generated/service-client';
var CommentComponent = /** @class */ (function () {
    function CommentComponent() {
        this.contentFlag = false;
    }
    CommentComponent.prototype.ngOnInit = function () {
    };
    CommentComponent.prototype.ngOnChanges = function () {
        if (this.commentList) {
            this.sortComment();
        }
    };
    CommentComponent.prototype.showContent = function (flag) {
        this.contentFlag = flag;
    };
    CommentComponent.prototype.sortComment = function () {
        // this.commentList.sort((a, b) => {
        //     if (a.commentDate < b.commentDate) {
        //         return 1;
        //     } else if (a.commentDate > b.commentDate) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommentComponent.prototype, "commentList", void 0);
    CommentComponent = __decorate([
        Component({
            selector: 'sg-comment',
            templateUrl: './comment.component.html',
            styleUrls: ['./comment.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], CommentComponent);
    return CommentComponent;
}());
export { CommentComponent };
//# sourceMappingURL=comment.component.js.map