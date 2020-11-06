import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Language, TranslationService } from 'angular-l10n';
var FormGridComponent = /** @class */ (function () {
    function FormGridComponent(translationService, cd, fb) {
        this.translationService = translationService;
        this.cd = cd;
        this.fb = fb;
        this.selectAll = new EventEmitter();
        this.onAdd = new EventEmitter();
        this.onDelete = new EventEmitter();
        this.canDeleteFirst = false;
        this.canDeleteLast = true;
        this.canAddFirst = true;
        this.canAddLast = true;
        this.onlyAddLast = false;
        this.cantDeleteSaved = false;
        this.hasAddDeleteColumn = true;
        this.addEmptyRow = false;
        this.ignoreEmptyGrid = false;
        this.minimumNumber = 1;
        this.idProp = 'id';
        this.selectAllEnabled = false;
        this.readonly = false;
        this.required = false;
        this.perPage = 50;
        this.reducedPadding = false;
        this.selectedFlag = 'selectedFlag';
        this.newFlag = 'newFlag';
        this.errorFlag = 'errorFlag';
        this.columns = [];
        this.startCount = 0;
        this.endCount = 0;
        this.totalCount = 0;
        this.pageNum = 1;
    }
    Object.defineProperty(FormGridComponent.prototype, "loading", {
        set: function (value) {
            if (value) {
                this.updatePageDisplay();
            }
        },
        enumerable: false,
        configurable: true
    });
    FormGridComponent.prototype.showItem = function (index) {
        if (this.filterProperty && (index + 1) >= this.startCount && index < this.endCount) {
            var formGroup = this.formArray.controls[index];
            return formGroup.get(this.filterProperty).value === this.filterValue;
        }
        else if ((index + 1) >= this.startCount && index < this.endCount) {
            return true;
        }
        else {
            return false;
        }
    };
    FormGridComponent.prototype.checkSelected = function (formGroup) {
        var selectedFlag = formGroup.get(this.selectedFlag);
        return selectedFlag && selectedFlag.value;
    };
    FormGridComponent.prototype.checkNew = function (formGroup) {
        var newFlag = formGroup.get(this.newFlag);
        return newFlag && newFlag.value;
    };
    FormGridComponent.prototype.checkError = function (formGroup) {
        var errorFlag = formGroup.get(this.errorFlag);
        return errorFlag && errorFlag.value;
    };
    Object.defineProperty(FormGridComponent.prototype, "selectAllChecked", {
        get: function () {
            var _this = this;
            var arrayLength = this.filterProperty ?
                this.formArray.controls.filter(function (form) { return !!form.get(_this.selectAllControl) &&
                    (form.get(_this.filterProperty).value === _this.filterValue); }).length :
                this.formArray.controls.length;
            return arrayLength === this.rowsChecked ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormGridComponent.prototype, "rowsChecked", {
        get: function () {
            var _this = this;
            var total = 0;
            this.formArray.controls.forEach(function (form) {
                if (form.get(_this.selectAllControl)) {
                    if (!!form.get(_this.selectAllControl).value) {
                        total++;
                    }
                }
            });
            return total;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormGridComponent.prototype, "showTable", {
        get: function () {
            var _this = this;
            if (this.ignoreEmptyGrid) {
                return true;
            }
            var showFlag = this.formArray && this.formArray.controls && this.formArray.controls.length > 0;
            if (this.filterProperty) {
                var hasValidRow = this.formArray.controls.findIndex(function (x) { return x.get(_this.filterProperty).value === _this.filterValue; }) >= 0;
                return showFlag && hasValidRow;
            }
            else {
                return showFlag;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormGridComponent.prototype, "emptyDescriptionColspan", {
        get: function () {
            var actionColumn = this.hasAddDeleteColumn ? 1 : 0;
            return this.columns.length + actionColumn;
        },
        enumerable: false,
        configurable: true
    });
    FormGridComponent.prototype.ngOnInit = function () {
        this.pageNum = 1;
        this.totalCount = this.formArray.controls.length;
        if (this.defaultSort) {
            this.currentSort = this.defaultSort;
        }
        this.updatePageDisplay();
        if (this.addEmptyRow && this.formArray.enabled) {
            this.addRowIfEmpty();
        }
    };
    FormGridComponent.prototype.ngAfterViewInit = function () {
        if (this.defaultSort) {
            this.initialSort();
        }
    };
    FormGridComponent.prototype.initialSort = function () {
        var _this = this;
        var defaultColumn = this.columns.find(function (column) { return column.sortName === _this.defaultSort; });
        this.onSort(defaultColumn.sortName, defaultColumn.sortDirAsc, defaultColumn.sortTransformFn);
    };
    FormGridComponent.prototype.addRowIfEmpty = function () {
        if (this.formArray.controls.length < this.minimumNumber && !this.readonly) {
            for (var i = this.formArray.controls.length; i < this.minimumNumber; i++) {
                this.addRow(i);
                this.parentFormGroup.markAsPristine();
                this.parentFormGroup.markAsUntouched();
                this.cd.detectChanges();
            }
        }
    };
    FormGridComponent.prototype.addColumn = function (column) {
        this.columns.push(column);
    };
    FormGridComponent.prototype.addRow = function (index) {
        var newForm = this.fb.group(this.formArrayTemplate);
        this.parentFormGroup.markAsDirty();
        this.parentFormGroup.markAsTouched();
        this.formArray.insert(index + 1, newForm);
        this.onAdd.emit(index);
        this.totalCount = this.formArray.controls.length;
        this.updatePageDisplay();
    };
    FormGridComponent.prototype.deleteRow = function (index) {
        var _this = this;
        this.parentFormGroup.markAsDirty();
        this.parentFormGroup.markAsTouched();
        this.formArray.removeAt(index);
        if (!this.ignoreEmptyGrid) {
            if (this.filterProperty) {
                if (this.formArray.controls.filter(function (x) { return x.get(_this.filterProperty).value === _this.filterValue; }).length < 1) {
                    this.formArray.insert(index, this.fb.group(this.formArrayTemplate));
                }
            }
            else {
                if (this.formArray.controls.length < 1) {
                    this.formArray.insert(index, this.fb.group(this.formArrayTemplate));
                }
            }
        }
        this.onDelete.emit(index);
        this.totalCount = this.formArray.controls.length;
        this.updatePageDisplay();
    };
    FormGridComponent.prototype.showAddButton = function (index, last) {
        return (index === 0 && this.canAddFirst && !this.onlyAddLast) ||
            ((index > 0 && !last) && !this.onlyAddLast) ||
            (last && this.canAddLast);
    };
    FormGridComponent.prototype.showDeleteButton = function (index, last) {
        if (this.cantDeleteSaved &&
            this.formArray.at(index).get(this.idProp) &&
            this.formArray.at(index).get(this.idProp).value) {
            return false;
        }
        if (this.readonlyField) {
            return !this.isReadonly(index);
        }
        return (index === 0 && this.canDeleteFirst) ||
            (index > 0 && !last) ||
            (index > 0 && (last && this.canDeleteLast));
    };
    FormGridComponent.prototype.isReadonly = function (index) {
        if (this.formArray.controls[index] instanceof FormGroup) {
            var formGroup = this.formArray.controls[index];
            if (formGroup.controls[this.readonlyField] instanceof FormControl) {
                var formControl = formGroup.controls[this.readonlyField];
                if (formControl.value) {
                    return true;
                }
            }
        }
        return false;
    };
    FormGridComponent.prototype.onPaginate = function (page) {
        this.pageNum = page;
        this.updatePageDisplay();
    };
    FormGridComponent.prototype.updatePageDisplay = function () {
        this.totalCount = this.formArray.controls.length;
        this.startCount = (this.pageNum - 1) * this.perPage + 1;
        this.endCount = this.startCount + this.perPage - 1;
        if (this.endCount > this.totalCount) {
            this.endCount = this.totalCount;
        }
        if (this.totalCount === 0) {
            this.startCount = 0;
        }
        this.pageDisplay = this.translationService.translate('Forms.TableCountDisplay')
            .replace('$0', this.startCount)
            .replace('$1', this.endCount)
            .replace('$2', this.totalCount);
    };
    FormGridComponent.prototype.onSelectAll = function (event) {
        var _this = this;
        if (!this.selectAllControl) {
            return;
        }
        this.formArray.controls.forEach(function (formGroup) {
            var selectControl = formGroup.get(_this.selectAllControl);
            var isFiltered = _this.filterProperty && (formGroup.get(_this.filterProperty).value != _this.filterValue);
            if (!selectControl.disabled && !isFiltered) {
                selectControl.setValue(event.checked);
            }
        });
        this.selectAll.emit();
    };
    FormGridComponent.prototype.onSort = function (controlName, sortDirAsc, sortTransformFn) {
        this.currentSort = controlName;
        this.formArray.controls.sort(this.compareFormGroups(controlName, sortTransformFn));
        if (!sortDirAsc) {
            this.formArray.controls.reverse();
        }
        this.formArray.updateValueAndValidity();
        this.cd.detectChanges();
    };
    FormGridComponent.prototype.compareFormGroups = function (controlName, sortTransformFn) {
        return function (a, b) {
            var compareA = sortTransformFn ? sortTransformFn(a.get(controlName).value) : a.get(controlName).value;
            var compareB = sortTransformFn ? sortTransformFn(b.get(controlName).value) : b.get(controlName).value;
            if (compareA < compareB) {
                return -1;
            }
            if (compareA > compareB) {
                return 1;
            }
            return 0;
        };
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormGridComponent.prototype, "selectAll", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormGridComponent.prototype, "onAdd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormGridComponent.prototype, "onDelete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "titleLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FormGridComponent.prototype, "parentFormGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormArray)
    ], FormGridComponent.prototype, "formArray", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "formArrayTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "canDeleteFirst", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "canDeleteLast", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "canAddFirst", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "canAddLast", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "onlyAddLast", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "cantDeleteSaved", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "hasAddDeleteColumn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "addEmptyRow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "ignoreEmptyGrid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "emptyGridDescription", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "translateParams", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "minimumNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "readonlyField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "buttonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "idProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "selectAllEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "selectAllControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "filterProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "filterValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "perPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormGridComponent.prototype, "defaultSort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "reducedPadding", void 0);
    __decorate([
        Input('loading'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FormGridComponent.prototype, "loading", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "selectedFlag", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "newFlag", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "errorFlag", void 0);
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], FormGridComponent.prototype, "lang", void 0);
    FormGridComponent = __decorate([
        Component({
            selector: 'samplicity-form-grid',
            templateUrl: './form-grid.component.html',
            styleUrls: ['./form-grid.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService,
            ChangeDetectorRef,
            FormBuilder])
    ], FormGridComponent);
    return FormGridComponent;
}());
export { FormGridComponent };
//# sourceMappingURL=form-grid.component.js.map