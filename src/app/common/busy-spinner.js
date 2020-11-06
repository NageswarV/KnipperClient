import { refCount, publishLast } from 'rxjs/operators';
var BusySpinner = /** @class */ (function () {
    function BusySpinner() {
        this.busyPromises = {};
    }
    BusySpinner.prototype.setBusySpinner = function (observable, prop, manual) {
        if (prop === void 0) { prop = ''; }
        if (manual === void 0) { manual = false; }
        var sharable = null;
        if (observable) {
            sharable = observable.pipe(publishLast(), refCount());
        }
        var promise = !manual ? sharable.toPromise() : new Promise(function (resolve, reject) {
            resolve = resolve;
            reject = reject;
        });
        if (prop) {
            this.busyPromises[prop] = promise;
        }
        else {
            this.busyPromises['default'] = promise;
        }
        return sharable;
    };
    Object.defineProperty(BusySpinner.prototype, "busyPromise", {
        get: function () {
            return this.busyPromises['default'];
        },
        enumerable: false,
        configurable: true
    });
    return BusySpinner;
}());
export { BusySpinner };
//# sourceMappingURL=busy-spinner.js.map