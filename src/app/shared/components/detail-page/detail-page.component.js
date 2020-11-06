import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../../forms/form/form.component';
import { LocaleService } from 'angular-l10n';
import { TranslationService } from 'angular-l10n';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { System } from '../../../shared/service-clients/system';
import { ClientService, Item } from '../../../core/client.service';
var DetailPageComponent = /** @class */ (function () {
    function DetailPageComponent(translationService, router, route, locale, clientService, systemService) {
        this.translationService = translationService;
        this.router = router;
        this.route = route;
        this.locale = locale;
        this.clientService = clientService;
        this.systemService = systemService;
        this.clientIdChangeKey = 'samplicity-dtp-changed-client';
        this.hideCreateButton = false;
        this.hideSaveButton = false;
        this.creatForm = new EventEmitter();
        this.save = new EventEmitter();
        this.reset = new EventEmitter();
        this.discard = new EventEmitter();
        this.navigate = new EventEmitter();
    }
    Object.defineProperty(DetailPageComponent.prototype, "detailName", {
        get: function () {
            if (this.form && this.form.formGroup) {
                var field = this.options.detailNameProp ?
                    this.form.formGroup.get(this.options.detailNameProp) :
                    this.form.formGroup.get("names" + this.locale.getCurrentLanguage());
                if (field) {
                    return field.value;
                }
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailPageComponent.prototype, "isCreatingNew", {
        get: function () {
            return !this.form.itemId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailPageComponent.prototype, "isReadOnly", {
        get: function () {
            return this.form.readonly;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailPageComponent.prototype, "backButtonText", {
        get: function () {
            return this.translationService.translate('Forms.Back') + this.translationService.translate(this.options.backButton);
        },
        enumerable: false,
        configurable: true
    });
    DetailPageComponent.prototype.disable = function () {
        this.form.hideSnackBar = true;
        this.form.readonly = true;
        this.form.disable('');
    };
    DetailPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (_this.options.listLink && _this.checkClientChange()) {
                _this.router.navigate([_this.options.listLink]);
            }
            else {
                _this.form.itemId = params.id;
                _this.creatForm.emit();
            }
        });
        this.loadBlackoutHoldBanner();
    };
    DetailPageComponent.prototype.onDiscard = function () {
        if (this.options.discardLink) {
            this.router.navigate([this.options.discardLink + this.form.itemId]);
            this.onReset();
        }
        else if (this.options.listLink) {
            this.router.navigate([this.options.listLink], {
                queryParams: {
                    discarded: this.translationService.translate(this.options.objectName)
                }
            });
        }
        this.discard.emit();
    };
    DetailPageComponent.prototype.onCancel = function (message) {
        if (this.options.discardLink) {
            this.router.navigate([this.options.discardLink + this.form.itemId]);
            this.onReset();
        }
        else if (this.options.listLink) {
            this.router.navigate([this.options.listLink], {
                queryParams: {
                    canceled: message
                }
            });
        }
        this.discard.emit();
    };
    DetailPageComponent.prototype.onDelete = function () {
        this.router.navigate([this.options.listLink], {
            queryParams: {
                deleted: this.translationService.translate(this.options.objectName)
            }
        });
    };
    DetailPageComponent.prototype.onReset = function () {
        this.reset.emit();
    };
    DetailPageComponent.prototype.updateIfItemCreated = function (itemId) {
        if (this.isCreatingNew) {
            this.form.itemId = itemId;
            this.router.navigate([this.options.createLink, itemId], {
                queryParams: {
                    created: true
                }
            });
        }
    };
    DetailPageComponent.prototype.checkClientChange = function () {
        var clientId = JSON.parse(localStorage.getItem(this.clientIdChangeKey));
        if (clientId) {
            localStorage.setItem(this.clientIdChangeKey, JSON.stringify(false));
            return true;
        }
        else {
            return false;
        }
    };
    DetailPageComponent.prototype.loadBlackoutHoldBanner = function () {
        var _this = this;
        this.systemService.getBlackoutHoldCount().subscribe(function (x) {
            if (x.result > 0) {
                var zipCodeMessage = _this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText1')
                    .replace('{0}', x.result);
                var selectedClientId = _this.clientService.getClientId();
                var messageList = [
                    new Item('blackoutHold', zipCodeMessage),
                    new Item(null, _this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText2')),
                    new Item(['/' + selectedClientId + '/orders/', 'blackoutHolds'], _this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText3'))
                ];
                _this.blackoutHoldNotificationWindow
                    .displayInfoMessageWithLinks(messageList, 'Notifications.BlackoutHold.BlackoutHoldBannerTitle');
            }
            else {
                _this.blackoutHoldNotificationWindow.removeAllMessages();
            }
        });
    };
    __decorate([
        ViewChild('form', { static: false }),
        __metadata("design:type", FormComponent)
    ], DetailPageComponent.prototype, "form", void 0);
    __decorate([
        ViewChild('blackoutHoldNotificationWindow', { static: false }),
        __metadata("design:type", NotificationComponent)
    ], DetailPageComponent.prototype, "blackoutHoldNotificationWindow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DetailPageComponent.prototype, "menuState", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DetailPageComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DetailPageComponent.prototype, "hideCreateButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DetailPageComponent.prototype, "hideSaveButton", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailPageComponent.prototype, "creatForm", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailPageComponent.prototype, "save", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailPageComponent.prototype, "reset", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailPageComponent.prototype, "discard", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailPageComponent.prototype, "navigate", void 0);
    DetailPageComponent = __decorate([
        Component({
            selector: 'samplicity-detail-page',
            templateUrl: './detail-page.component.html',
            styleUrls: ['./detail-page.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService,
            Router,
            ActivatedRoute,
            LocaleService,
            ClientService,
            System])
    ], DetailPageComponent);
    return DetailPageComponent;
}());
export { DetailPageComponent };
//# sourceMappingURL=detail-page.component.js.map