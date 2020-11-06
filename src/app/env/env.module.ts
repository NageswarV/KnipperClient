
import {timer as observableTimer,  Observable } from 'rxjs';
import { NgModule } from '@angular/core';

import 'rxjs/Rx';

import { EnvService } from './env.service';

@NgModule({
    providers: [
        EnvService
    ]
})
export class EnvModule {
    constructor(
        envService: EnvService
    ) {
        const currentAppVersion = envService.get().appVersion;

        const environmentCheckingTimer = observableTimer(30 * 60 * 1000, 30 * 60 * 1000).subscribe(() => {
            Observable.ajax('/build.json').subscribe(x => {
                if (x.status === 200) {
                    if (x.response &&
                        x.response.appVersion &&
                        x.response.appVersion != currentAppVersion) {
                        envService.reloadApp();
                    }
                } else {
                    environmentCheckingTimer.unsubscribe();
                }
            }, x => {
                environmentCheckingTimer.unsubscribe();
            });
        });
    }
}
