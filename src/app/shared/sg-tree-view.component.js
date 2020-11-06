import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * The NgbTreeview a simple way to create tree view in html.
 */
var SgTreeViewComponent = /** @class */ (function () {
    function SgTreeViewComponent() {
        this.nodes = [];
        this.collapseAttr = 'isCollapsed';
        this.selectAttr = 'isSelected';
        this.inDeterminateAttr = 'isIndeterminate';
        this.startDate = 'startDate';
        this.endDate = 'endDate';
        this.date = new Date();
        this.datePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            height: '45px',
            selectionTxtFontSize: '15px',
            showClearDateBtn: true,
            disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
            editableDateField: false,
            inline: false
        };
        /**
         * A flag indicating data is flatten in array and prepare is required.(Default
         * is true).
         */
        this.prepareData = true;
        /**
         * Name of children list property in input data.
         */
        this.childrenAttr = 'CHILDREN';
        /**
         * When change a node model this event will be emit.
         */
        this.onChange = new EventEmitter();
        /**
         * On click node.
         */
        this.onClick = new EventEmitter();
        this.date.setDate(this.date.getDate() - 1);
    }
    Object.defineProperty(SgTreeViewComponent.prototype, "collapseAll", {
        /**
         * Collapse or expand all parent nodes.
         */
        set: function (value) {
            this._collapseAll = value;
            this._recursiveEdit(this.nodes, this.childrenAttr, this.collapseAttr, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SgTreeViewComponent.prototype, "selectAll", {
        /**
         * Select or deselect all nodes.
         */
        set: function (value) {
            this._selectAll = value;
            this._recursiveEdit(this.nodes, this.childrenAttr, this.selectAttr, value);
            this._recursiveEdit(this.nodes, this.childrenAttr, this.inDeterminateAttr, false);
        },
        enumerable: false,
        configurable: true
    });
    SgTreeViewComponent.prototype.ngOnInit = function () {
        // Clone input data for protect.
        var cloned = this.data.map(function (x) { return Object.assign([], x); });
        // If data is flat, prepare data with recursive function.
        this.nodes = this.prepareData ? this._getPreparedData(cloned) : this.data;
    };
    SgTreeViewComponent.prototype.onModelChange = function (node) {
        if (node[this.childrenAttr].length) {
            this._recursiveEdit([node], this.childrenAttr, this.selectAttr, node[this.selectAttr]);
        }
        this.onChange.emit(node);
    };
    SgTreeViewComponent.prototype.click = function (node) {
        if (node[this.childrenAttr].length) {
            node[this.collapseAttr] = !node[this.collapseAttr];
        }
        this.onClick.emit(node);
    };
    SgTreeViewComponent.prototype.change = function (value) {
        var _this = this;
        var parent = this.nodes.filter(function (item) { return item[_this.idAttr] === value[_this.parentAttr]; })[0];
        if (parent) {
            var hasDifferent = false, duplicate_1 = {}, isIndeterminate_1 = value[this.inDeterminateAttr] || false;
            parent[this.childrenAttr].forEach(function (item) {
                duplicate_1[item[_this.selectAttr]] =
                    (duplicate_1[item[_this.selectAttr]] || 0) + 1;
                if (item[_this.inDeterminateAttr]) {
                    isIndeterminate_1 = true;
                }
            });
            if (Object.keys(duplicate_1).length === 1 && !isIndeterminate_1) {
                parent[this.inDeterminateAttr] = false;
                parent[this.selectAttr] = JSON.parse(Object.keys(duplicate_1)[0]);
                this.onChange.emit(parent);
            }
            else {
                parent[this.inDeterminateAttr] = true;
                this.onChange.emit(parent);
            }
        }
    };
    SgTreeViewComponent.prototype._recursiveEdit = function (list, childrenAttr, attr, value) {
        if (Array.isArray(list)) {
            for (var i = 0, len = list.length; i < len; i++) {
                list[i][attr] = value;
                if (list[i][childrenAttr].length) {
                    this._recursiveEdit(list[i][childrenAttr], childrenAttr, attr, value);
                }
            }
        }
    };
    SgTreeViewComponent.prototype.dateChanged = function (value) {
        this.onChange.emit(true);
    };
    SgTreeViewComponent.prototype._getPreparedData = function (list) {
        var tree = [], lookup = {};
        for (var i = 0, len = list.length; i < len; i++) {
            lookup[list[i][this.idAttr]] = list[i];
            list[i][this.childrenAttr] = [];
            list[i][this.collapseAttr] = true;
            list[i][this.selectAttr] = false;
            list[i][this.inDeterminateAttr] = false;
            list[i][this.startDate] = new Date();
            list[i][this.endDate] = new Date();
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i][this.parentAttr]) {
                lookup[list[i][this.parentAttr]][this.childrenAttr].push(list[i]);
            }
            else {
                tree.push(list[i]);
            }
        }
        return tree;
    };
    ;
    __decorate([
        Input('data'),
        __metadata("design:type", Array)
    ], SgTreeViewComponent.prototype, "data", void 0);
    __decorate([
        Input('prepareData'),
        __metadata("design:type", Boolean)
    ], SgTreeViewComponent.prototype, "prepareData", void 0);
    __decorate([
        Input('idAttr'),
        __metadata("design:type", Object)
    ], SgTreeViewComponent.prototype, "idAttr", void 0);
    __decorate([
        Input('parentAttr'),
        __metadata("design:type", Object)
    ], SgTreeViewComponent.prototype, "parentAttr", void 0);
    __decorate([
        Input('childrenAttr'),
        __metadata("design:type", String)
    ], SgTreeViewComponent.prototype, "childrenAttr", void 0);
    __decorate([
        Input('collapseAll'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SgTreeViewComponent.prototype, "collapseAll", null);
    __decorate([
        Input('selectAll'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SgTreeViewComponent.prototype, "selectAll", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SgTreeViewComponent.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SgTreeViewComponent.prototype, "onClick", void 0);
    SgTreeViewComponent = __decorate([
        Component({
            selector: 'sg-tree-view',
            templateUrl: './sg-tree-view.component.html',
            styleUrls: ['./sg-tree-view.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SgTreeViewComponent);
    return SgTreeViewComponent;
}());
export { SgTreeViewComponent };
//# sourceMappingURL=sg-tree-view.component.js.map