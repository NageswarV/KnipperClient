import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
var DialogListComponent = /** @class */ (function () {
    function DialogListComponent(matDialog) {
        this.matDialog = matDialog;
        this.loading = false;
        this._items = [];
    }
    Object.defineProperty(DialogListComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (value) {
                this._items = value;
                this.loading = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    DialogListComponent.prototype.ngOnInit = function () {
    };
    DialogListComponent.prototype.show = function (options) {
        var _this = this;
        this.loading = true;
        this.options = options;
        this.dialogRef = this.matDialog.open(this.dialog, { minWidth: '40vw' });
        this.dialogRef.afterClosed().subscribe(function () {
            _this.options = null;
            _this.items = [];
        });
    };
    __decorate([
        ViewChild('dialog', { static: false }),
        __metadata("design:type", Object)
    ], DialogListComponent.prototype, "dialog", void 0);
    __decorate([
        Input('items'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DialogListComponent.prototype, "items", null);
    DialogListComponent = __decorate([
        Component({
            selector: 'samplicity-dialog-list',
            templateUrl: './dialog-list.component.html',
            styleUrls: ['./dialog-list.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [MatDialog])
    ], DialogListComponent);
    return DialogListComponent;
}());
export { DialogListComponent };
//# sourceMappingURL=dialog-list.component.js.map