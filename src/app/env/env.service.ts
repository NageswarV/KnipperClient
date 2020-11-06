import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {
  private readonly initConfiguration: InitConfiguration;

  constructor() {
    this.initConfiguration = new InitConfiguration(
      Environment.appVersion,
      Environment.debugMode == "true" ? true : Environment.debugMode == "false" ? false : true,
      Environment.clientId,
      Environment.webApiUrl,
      Environment.tokenEndPointUri,
      parseInt(Environment.refreshTokenLiftime),
      Environment.enableAppInsights == "true" ? true : Environment.enableAppInsights == "false" ? false : false,
      Environment.appInsightsInstrumentationKey,
      Environment.livechaturl,
      Environment.domain,
      Environment.environment,
      Environment.analyticsToken,
      Environment.allowAnalytics
    );
  }

  get(): InitConfiguration {
    return this.initConfiguration;
  }

  get host(): string {
    return window.location.hostname;
  }

  reloadApp(): void {
    window.location.reload(true);
  }

  get languageCode(): string {
    return 'en';
  }
}


export class InitConfiguration {
  readonly appVersion: string;
  readonly debugMode: boolean;
  readonly clientId: string;
  readonly webApiUrl: string;
  readonly tokenEndPointUri: string;
  readonly refreshTokenLiftime: number;
  readonly enableAppInsights: boolean;
  readonly appInsightsInstrumentationKey: string;
  readonly livechaturl: string;
  readonly domain:string;
  readonly environment:string;
  readonly analyticsToken: string;
  readonly allowAnalytics: string;

  constructor(
    appVersion: string,
    debugMode: boolean,
    clientId: string,
    webApiUrl: string,
    tokenEndPointUri: string,
    refreshTokenLiftime: number,
    enableAppInsights: boolean,
    appInsightsInstrumentationKey: string,
    livechaturl: string,    
    domain:string,
    environment:string,
    analyticsToken: string,
    allowAnalytics: string
  ) {
    this.appVersion = appVersion;
    this.debugMode = debugMode;
    this.clientId = clientId;
    this.webApiUrl = webApiUrl;
    this.tokenEndPointUri = tokenEndPointUri;
    this.refreshTokenLiftime = refreshTokenLiftime;
    this.enableAppInsights = enableAppInsights;
    this.appInsightsInstrumentationKey = appInsightsInstrumentationKey;
    this.livechaturl = livechaturl;
    this.domain=domain;
    this.environment=environment;
    this.analyticsToken = analyticsToken;
    this.allowAnalytics = allowAnalytics;
  }
};
