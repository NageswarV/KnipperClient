import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
var RepTerritoryHistoryComponent = /** @class */ (function () {
    function RepTerritoryHistoryComponent(repTerritoryData) {
        this.repTerritoryData = repTerritoryData;
        this.columns = [
            { title: 'Territory Code', classes: 'col-xs-2 p-1 pl-2' },
            { title: 'Territory Name', classes: 'col-xs-2 p-1' },
            { title: 'Start Date', classes: 'col-xs-2 p-1' },
            { title: 'End Date', classes: 'col-xs-2 p-1' },
        ];
    }
    RepTerritoryHistoryComponent.prototype.ngOnInit = function () {
    };
    RepTerritoryHistoryComponent = __decorate([
        Component({
            selector: 'app-rep-territory-history',
            templateUrl: './rep-territory-history.component.html',
            styleUrls: ['./rep-territory-history.component.scss']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Array])
    ], RepTerritoryHistoryComponent);
    return RepTerritoryHistoryComponent;
}());
export { RepTerritoryHistoryComponent };
//# sourceMappingURL=rep-territory-history.component.js.map