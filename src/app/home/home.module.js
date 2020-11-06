import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ExternalServicesComponent } from './external-services/external-services.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { SearchByHCPComponent } from './view-activity/search-by-hcp/search-by-hcp.component';
import { SearchByRepComponent } from './view-activity/search-by-rep/search-by-rep.component';
import { SearchByProductComponent } from './view-activity/search-by-product/search-by-product.component';
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                HomeRoutingModule
            ],
            providers: [
                HomeService
            ],
            declarations: [
                HomeComponent,
                AnnouncementsComponent,
                ExternalServicesComponent,
                ViewActivityComponent,
                SearchByHCPComponent,
                SearchByRepComponent,
                SearchByProductComponent,
            ],
            exports: [
                HomeRoutingModule
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
export { HomeModule };
//# sourceMappingURL=home.module.js.map