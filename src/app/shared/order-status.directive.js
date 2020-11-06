import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
var OrderStatusDirective = /** @class */ (function () {
    function OrderStatusDirective(el) {
        this.el = el;
        this.currentElement = el;
    }
    OrderStatusDirective.prototype.ngOnInit = function () {
        var OrderStatus = this.OrderStatus;
        switch (OrderStatus.toLowerCase()) {
            case "approved":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Approved';
                this.currentElement.nativeElement.style.color = 'blue';
                break;
            case "delivered":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Delivered';
                this.currentElement.nativeElement.style.color = 'green';
                break;
            case "onhold":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> On Hold';
                this.currentElement.nativeElement.style.color = 'blue';
                break;
            case "pending approval":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Pending Approval';
                this.currentElement.nativeElement.style.color = 'blue';
                break;
            case "rejected":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Rejected';
                this.currentElement.nativeElement.style.color = 'red';
                break;
            case "shipped":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Shipped';
                this.currentElement.nativeElement.style.color = 'blue';
                break;
            case "submitted":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Submitted';
                this.currentElement.nativeElement.style.color = 'green';
                break;
            case "cancelled":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelled';
                this.currentElement.nativeElement.style.color = 'red';
                break;
            case "processed":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Processed';
                this.currentElement.nativeElement.style.color = 'green';
                break;
            case "partiallyreturned":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Partially Returned';
                this.currentElement.nativeElement.style.color = 'orange';
                break;
            case "Returned":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Returned';
                this.currentElement.nativeElement.style.color = 'green';
                break;
            case "in process":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> In Process';
                this.currentElement.nativeElement.style.color = 'orange';
                break;
            case "on hold":
                this.currentElement.nativeElement.innerHTML = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> On Hold';
                this.currentElement.nativeElement.style.color = 'blue';
                break;
        }
    };
    __decorate([
        Input('OrderStatus'),
        __metadata("design:type", String)
    ], OrderStatusDirective.prototype, "OrderStatus", void 0);
    OrderStatusDirective = __decorate([
        Directive({
            selector: '[OrderStatus]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], OrderStatusDirective);
    return OrderStatusDirective;
}());
export { OrderStatusDirective };
//# sourceMappingURL=order-status.directive.js.map