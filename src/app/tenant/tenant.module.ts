import { NgModule } from '@angular/core';

import { TenantService } from './tenant.service';

@NgModule({
    providers: [
        TenantService
    ]
})
export class TenantModule { }
