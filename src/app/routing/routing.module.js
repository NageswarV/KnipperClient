import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { LoginComponent, PasswordForgotComponent, PasswordResetComponent, ForbiddenComponent, SSOComponent, UnderMaintenanceComponent, PinResetComponent} from '../authentication';
//import { AuthenticationGuard } from './authentication.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CustomPreloadingStrategy } from '../shared/custom-preloading-strategy';
import { LoginComponent, PasswordForgotComponent } from '../authentication';
import { HomeComponent } from '../home/home.component';
import { AuthenticationGuard } from './authentication.guard';
import { GenerateReportsComponent } from '../report/generate-reports/generate-reports.component';
import { UploadedReportsComponent } from '../report/uploaded-reports/uploaded-reports.component';
import { TasksComponent } from '../tasks/tasks.component';
import { DashboardDetailComponent } from '../dashboard/dashboard/dashboard-detail.component';
import { HcpOrderListComponent } from '../hcp/hcp-order-list/hcp-order-list.component';
import { ProductComponent } from '../product/product.component';
import { DtrOrderDetailsComponent } from '../shared/components/dtr-order-details/dtr-order-details.component';
import { RepComponent } from '../rep/rep/rep.component';
import { DtpOrderDetailsComponent } from '../shared/components/dtp-order-details/dtp-order-details.component';
var coreRoutes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'reps',
        component: RepComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'hcp/orders',
        children: [
            {
                path: '', component: HcpOrderListComponent
            },
            {
                path: 'orders/:id', component: DtrOrderDetailsComponent
            },
            {
                path: 'dtporders/:id',
                loadChildren: '../order/order.module#OrderModule'
            }
        ],
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'products',
        component: ProductComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'reports/generated',
        component: GenerateReportsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'reports/uploaded',
        component: UploadedReportsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'dashboard',
        component: DashboardDetailComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'passwordforgot',
        component: PasswordForgotComponent,
    },
    //{
    //   path: 'passwordreset',
    //   component: PasswordResetComponent,
    //   canActivate: [AuthenticationGuard]
    // },
    {
        path: '**',
        redirectTo: '/home',
    }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(coreRoutes, { useHash: true, preloadingStrategy: CustomPreloadingStrategy })
            ],
            providers: [
                //AuthenticationGuard,
                CanDeactivateGuard,
                CustomPreloadingStrategy
            ],
            exports: [
                RouterModule
            ]
        })
    ], RoutingModule);
    return RoutingModule;
}());
export { RoutingModule };
//# sourceMappingURL=routing.module.js.map