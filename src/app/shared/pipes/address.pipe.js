import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { ZipCodePipe } from './zip-code.pipe';
var AddressPipe = /** @class */ (function () {
    function AddressPipe() {
    }
    AddressPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        var city = [];
        city.push(value.cityName);
        city.push(value.stateCode);
        if (value.zipCode) {
            var pipe = new ZipCodePipe();
            city.push(pipe.transform(value.zipCode));
        }
        var cityText = city.filter(Boolean).join(', ');
        var address = [];
        address.push(value.companyName);
        address.push(value.address1Text);
        address.push(value.address2Text);
        address.push(cityText);
        var addressText = address.filter(Boolean).join('<br/>');
        return addressText;
    };
    AddressPipe = __decorate([
        Pipe({ name: 'address' }),
        __metadata("design:paramtypes", [])
    ], AddressPipe);
    return AddressPipe;
}());
export { AddressPipe };
//# sourceMappingURL=address.pipe.js.map