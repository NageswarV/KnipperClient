import { L10nConfig, StorageStrategy, ProviderType } from 'angular-l10n';

export const l10nLangConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'en', countryCode: 'US' },
    currency: 'USD',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      {type: ProviderType.Static, prefix: './assets/locale-'}
    ],
    caching: true,
    //missingValue: 'No key',
    composedKeySeparator: '.'
  }
};
