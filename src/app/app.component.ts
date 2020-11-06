import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AppInsightsService } from 'ng2-appinsights';
import { Router, NavigationEnd } from '@angular/router';

import { EnvService } from './env';
import { CacheService } from './cache';

declare let gtag: Function;

@Component({
    selector: 'sg-body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    themeUrl: SafeResourceUrl;

    constructor(
        private cacheService: CacheService,
        private sanitizer: DomSanitizer,
        public router: Router,
        private envService: EnvService
    ) {
        this.router.events.subscribe(event => {
            if((event instanceof NavigationEnd) && (this.envService.get().allowAnalytics === 'true')){
                gtag('config', this.envService.get().analyticsToken, 
                      {
                        'page_path': event.urlAfterRedirects
                      }
                     );
            }
        });
    }

    ngOnInit(): void {
      this.themeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cacheService.tenantInfo.themeUrl);
    }
}
