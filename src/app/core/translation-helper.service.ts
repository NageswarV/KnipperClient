import { Injectable } from '@angular/core';
import { LocaleService, TranslationService } from 'angular-l10n';

@Injectable()
export class TranslationHelperService {

  constructor(
    private locale: LocaleService,
    public translationService: TranslationService
  ) { }

  getLocalizedValue(obj: any, propName: string = 'names', language?: string): any {
    if (obj && Array.isArray(obj[propName])) {
      if (!language) {
        const language = this.locale.getCurrentLanguage();
      }
      const name = obj[propName].find(item => item.language && item.language.toString() === language);
      if (name) {
        return name.value;
      }
    }
    return null;
  }

  getLocalizedValueFromListById(id: string, list: any[]): any {
    if (Array.isArray(list)) {
      const item = list.find(item => item.id === id);
      if (item) {
        const value = this.getLocalizedValue(item);
        if (value) {
          return value;
        }
      }
    }
    return null;
  }

  getCurrentLanguage(): string {
    return this.locale.getCurrentLanguage();
  }

  translate(keys: string | string[], args?: any, lang?: string): string | any {
    return this.translationService.translate(keys, args, lang);
  }

}
