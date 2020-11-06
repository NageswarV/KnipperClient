export interface AzureAADConfig {
  tenant: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  expireOffsetSeconds: string;
}

export class AppConfiguration {
  static version: string;
  static azureAADConfig: AzureAADConfig;
}
