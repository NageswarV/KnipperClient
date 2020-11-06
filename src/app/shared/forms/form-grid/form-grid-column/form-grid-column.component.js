import { __decorate, __metadata } from "tslib";
import { Component, TemplateRef, ContentChild, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGridComponent } from '../form-grid.component';
import { Language } from 'angular-l10n';
var FormGridColumnComponent = /** @class */ (function () {
    function FormGridColumnComponent(grid) {
        this.grid = grid;
        this.sortDirAsc = true;
        grid.addColumn(this);
    }
    __decorate([
        Input(),
        __metadata("design:type", AbstractControl)
    ], FormGridColumnComponent.prototype, "formControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridColumnComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridColumnComponent.prototype, "headerHelperText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridColumnComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormGridColumnComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridColumnComponent.prototype, "sortName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridColumnComponent.prototype, "sortDirAsc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], FormGridColumnComponent.prototype, "sortTransformFn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormGridColumnComponent.prototype, "isHidden", void 0);
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], FormGridColumnComponent.prototype, "lang", void 0);
    __decorate([
        ContentChild('columnCellTemplate', { static: false }),
        __metadata("design:type", TemplateRef)
    ], FormGridColumnComponent.prototype, "cellTemplate", void 0);
    FormGridColumnComponent = __decorate([
        Component({
            selector: 'samplicity-form-grid-column',
            templateUrl: './form-grid-column.component.html',
            styleUrls: ['./form-grid-column.component.scss']
        }),
        __metadata("design:paramtypes", [FormGridComponent])
    ], FormGridColumnComponent);
    return FormGridColumnComponent;
}());
export { FormGridColumnComponent };
//# sourceMappingURL=form-grid-column.component.js.map