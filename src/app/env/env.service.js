import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
var EnvService = /** @class */ (function () {
    function EnvService() {
        this.initConfiguration = new InitConfiguration(Environment.appVersion, Environment.debugMode == "true" ? true : Environment.debugMode == "false" ? false : true, Environment.clientId, Environment.webApiUrl, Environment.tokenEndPointUri, parseInt(Environment.refreshTokenLiftime), Environment.enableAppInsights == "true" ? true : Environment.enableAppInsights == "false" ? false : false, Environment.appInsightsInstrumentationKey, Environment.livechaturl, Environment.domain, Environment.environment, Environment.analyticsToken, Environment.allowAnalytics);
    }
    EnvService.prototype.get = function () {
        return this.initConfiguration;
    };
    Object.defineProperty(EnvService.prototype, "host", {
        get: function () {
            return window.location.hostname;
        },
        enumerable: false,
        configurable: true
    });
    EnvService.prototype.reloadApp = function () {
        window.location.reload(true);
    };
    Object.defineProperty(EnvService.prototype, "languageCode", {
        get: function () {
            return 'en';
        },
        enumerable: false,
        configurable: true
    });
    EnvService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], EnvService);
    return EnvService;
}());
export { EnvService };
var InitConfiguration = /** @class */ (function () {
    function InitConfiguration(appVersion, debugMode, clientId, webApiUrl, tokenEndPointUri, refreshTokenLiftime, enableAppInsights, appInsightsInstrumentationKey, livechaturl, domain, environment, analyticsToken, allowAnalytics) {
        this.appVersion = appVersion;
        this.debugMode = debugMode;
        this.clientId = clientId;
        this.webApiUrl = webApiUrl;
        this.tokenEndPointUri = tokenEndPointUri;
        this.refreshTokenLiftime = refreshTokenLiftime;
        this.enableAppInsights = enableAppInsights;
        this.appInsightsInstrumentationKey = appInsightsInstrumentationKey;
        this.livechaturl = livechaturl;
        this.domain = domain;
        this.environment = environment;
        this.analyticsToken = analyticsToken;
        this.allowAnalytics = allowAnalytics;
    }
    return InitConfiguration;
}());
export { InitConfiguration };
;
//# sourceMappingURL=env.service.js.map