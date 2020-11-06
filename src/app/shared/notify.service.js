import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { TranslationService } from 'angular-l10n';
var NotifyService = /** @class */ (function () {
    function NotifyService(translationService) {
        this.translationService = translationService;
        PNotify.prototype.options.stack.firstpos1 = 100;
        this.settings = {
            styling: 'brighttheme',
            buttons: {
                sticker: false
            },
            animate: {
                animate: true,
                in_class: 'bounceInRight',
                out_class: 'bounceOutRight'
            }
        };
    }
    NotifyService.prototype.pnotify = function (opts, delay, closeOnClick) {
        if (delay === void 0) { delay = 0; }
        if (closeOnClick === void 0) { closeOnClick = true; }
        Object.assign(opts, this.settings);
        if (delay === 0) {
            opts.hide = false;
        }
        else {
            opts.hide = true;
            opts.delay = delay;
        }
        if (opts.type === 'error') {
            opts.buttons.closer_hover = false;
            // closeOnClick = false;
        }
        opts.text = this.translationService.translate(opts.text) || opts.text;
        opts.title = this.translationService.translate(opts.title) || opts.title;
        var notice = new PNotify(opts);
        if (closeOnClick) {
            notice.get().click(function (e) {
                if (!$(e.target).hasClass('ui-pnotify-closer')) {
                    $('.ui-pnotify-closer', this).click();
                }
            });
        }
        return notice;
    };
    NotifyService.prototype.success = function (opts, delay, closeOnClick) {
        if (delay === void 0) { delay = 5000; }
        if (closeOnClick === void 0) { closeOnClick = true; }
        opts.type = 'success';
        return this.pnotify(opts, delay, closeOnClick);
    };
    NotifyService.prototype.notice = function (opts, delay, closeOnClick) {
        if (delay === void 0) { delay = 5000; }
        if (closeOnClick === void 0) { closeOnClick = true; }
        opts.type = 'notice';
        return this.pnotify(opts, delay, closeOnClick);
    };
    NotifyService.prototype.error = function (opts, delay, closeOnClick) {
        if (delay === void 0) { delay = 5000; }
        if (closeOnClick === void 0) { closeOnClick = true; }
        opts.type = 'error';
        return this.pnotify(opts, delay, closeOnClick);
    };
    NotifyService.prototype.info = function (opts, delay, closeOnClick) {
        if (delay === void 0) { delay = 5000; }
        if (closeOnClick === void 0) { closeOnClick = true; }
        opts.type = 'info';
        return this.pnotify(opts, delay, closeOnClick);
    };
    NotifyService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TranslationService])
    ], NotifyService);
    return NotifyService;
}());
export { NotifyService };
//# sourceMappingURL=notify.service.js.map