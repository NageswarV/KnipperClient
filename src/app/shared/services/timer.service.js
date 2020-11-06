import { __decorate, __metadata } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
var TimerService = /** @class */ (function () {
    function TimerService() {
        this.running = false;
        this.currentCount = 0;
        this.warnAt = 0;
        this.warn = new EventEmitter();
        this.expired = new EventEmitter();
        this.initialCountValue = 0;
        this.isDebugMode = false;
        this.debugTickIntervalInSeconds = 10;
    }
    TimerService.prototype.start = function (countdownFrom, warnAt) {
        if (countdownFrom === void 0) { countdownFrom = 10; }
        if (warnAt === void 0) { warnAt = 5; }
        this.running = true;
        this.currentCount = countdownFrom;
        this.initialCountValue = countdownFrom;
        this.warnAt = warnAt;
        this.tickerInterval = setInterval(this.tick.bind(this), 1000);
    };
    TimerService.prototype.clear = function () {
        clearInterval(this.tickerInterval);
        this.running = false;
        this.currentCount = this.initialCountValue;
    };
    TimerService.prototype.restart = function () {
        this.currentCount = this.initialCountValue;
    };
    TimerService.prototype.tick = function () {
        if (this.currentCount <= this.warnAt) {
            this.warn.emit(this.currentCount);
        }
        if (this.currentCount === 0) {
            this.expired.emit(true);
            this.running = false;
            clearInterval(this.tickerInterval);
        }
        this.currentCount--;
        if (this.isDebugMode) {
            this.debugMessage(this.currentCount, this.warnAt);
        }
    };
    TimerService.prototype.debugMessage = function (currentCount, warnAt) {
        var debugMessage;
        if (currentCount <= 0) {
            debugMessage = 'Time\'s up!';
        }
        else if (currentCount % this.debugTickIntervalInSeconds === 0) {
            debugMessage = currentCount + ' seconds left!';
            if (currentCount > warnAt) {
                debugMessage = debugMessage + ' Warning @ ' + warnAt + ' seconds!';
            }
        }
        if (debugMessage) {
            console.log(debugMessage);
        }
    };
    TimerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TimerService);
    return TimerService;
}());
export { TimerService };
//# sourceMappingURL=timer.service.js.map