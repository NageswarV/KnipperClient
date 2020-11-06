import { StorageStrategy, ProviderType } from 'angular-l10n';
export var l10nLangConfig = {
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
            { type: ProviderType.Static, prefix: './assets/locale-' }
        ],
        caching: true,
        //missingValue: 'No key',
        composedKeySeparator: '.'
    }
};
//# sourceMappingURL=l10n-config.js.map