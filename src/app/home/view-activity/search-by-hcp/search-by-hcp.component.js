import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
var SearchByHCPComponent = /** @class */ (function () {
    function SearchByHCPComponent() {
        this.searchName = new EventEmitter();
    }
    SearchByHCPComponent.prototype.ngOnInit = function () {
    };
    SearchByHCPComponent.prototype.back = function () {
        this.searchName.emit('');
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchByHCPComponent.prototype, "searchName", void 0);
    SearchByHCPComponent = __decorate([
        Component({
            selector: 'sg-search-by-hcp',
            templateUrl: './search-by-hcp.component.html',
            styleUrls: ['../../home.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SearchByHCPComponent);
    return SearchByHCPComponent;
}());
export { SearchByHCPComponent };
//# sourceMappingURL=search-by-hcp.component.js.map