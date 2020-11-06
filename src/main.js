import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
if (Environment.debugMode === 'false') {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map