import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
var StockAvailabilityDirective = /** @class */ (function () {
    function StockAvailabilityDirective(el) {
        this.el = el;
        this.currentElement = el;
    }
    StockAvailabilityDirective.prototype.ngOnInit = function () {
        var StockBit = this.stockbit;
        if (StockBit) {
            this.currentElement.nativeElement.innerHTML = '<div class="in-stock"><span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> In Stock</div>';
            //this.currentElement.nativeElement.style.color = 'green';
        }
        else {
            this.currentElement.nativeElement.innerHTML = '<div class="out-of-stock"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Out Of Stock</div>';
            //this.currentElement.nativeElement.style.color = 'red';
        }
    };
    __decorate([
        Input('StockAvailability'),
        __metadata("design:type", Boolean)
    ], StockAvailabilityDirective.prototype, "stockbit", void 0);
    StockAvailabilityDirective = __decorate([
        Directive({
            selector: '[StockAvailability]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], StockAvailabilityDirective);
    return StockAvailabilityDirective;
}());
export { StockAvailabilityDirective };
//# sourceMappingURL=stock-availability.directive.js.map