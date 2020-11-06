;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Environment = factory();
    }
}(this, function () {
    'use strict';
    var Environment = {
        "appVersion": "1.0.0.0",
        "debugMode": "true",
        "clientId": "ClientPortal.Web",
        "webApiUrl": "https://clientportal-sit-api.azurewebsites.net/",
        "tokenEndPointUri": "/Token",
        "refreshTokenLiftime": "1200000",
        "enableAppInsights": "false",
        "appInsightsInstrumentationKey": ""
    }
    return Environment;
}));