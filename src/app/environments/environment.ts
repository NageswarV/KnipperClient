// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  classificationServiceUrl: 'http://localhost:5003',
  localizationServiceUrl: 'http://localhost:5005',
  orderManagementServiceUrl: 'http://localhost:5002',
  referenceDataServiceUrl: 'http://localhost:5008',
  securityServiceUrl: 'http://localhost:5004',
  tenantServiceUrl: 'http://localhost:5001',
  systemServiceUrl: 'http://localhost:5010',
  communicationServiceUrl: 'http://localhost:5009',
  appInsightsInstrumentationKey: '',
  aadTenantId: '05643f5b-c894-4bb4-a82f-42feb09b1194',
  aadClientId: '892e1ba3-c65d-40f4-b6c5-2350537676c8'
};
