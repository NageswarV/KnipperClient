import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';

//import { LoginComponent, PasswordForgotComponent, PasswordResetComponent, ForbiddenComponent, SSOComponent, UnderMaintenanceComponent, PinResetComponent} from '../authentication';
//import { AuthenticationGuard } from './authentication.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CustomPreloadingStrategy } from '../shared/custom-preloading-strategy';
import { Permissions } from '../../generated/permission-set';
import { LoginComponent, PasswordForgotComponent } from '../authentication';
import { HomeComponent } from '../home/home.component';
import { AuthenticationGuard } from './authentication.guard';
import { GenerateReportsComponent } from '../report/generate-reports/generate-reports.component';
import { UploadedReportsComponent } from '../report/uploaded-reports/uploaded-reports.component';
import { TasksComponent } from '../tasks/tasks.component';
import { DashboardDetailComponent } from '../dashboard/dashboard/dashboard-detail.component';
import { RepOrderListComponent } from '../rep/rep-order-list/rep-order-list.component';
import { HcpOrderListComponent } from '../hcp/hcp-order-list/hcp-order-list.component';
import { ProductComponent } from '../product/product.component';
import { DtrOrderDetailsComponent } from '../shared/components/dtr-order-details/dtr-order-details.component';
import { RepComponent } from '../rep/rep/rep.component';
import { DtpOrderDetailsComponent } from '../shared/components/dtp-order-details/dtp-order-details.component';
import { TaskDetailsComponent } from '../tasks/task-details/task-details.component';
import { ReportDetailsComponent } from '../report/generate-reports/report-details/report-details.component';
import { HandcarryDistbursementOrderDetailsComponent } from '../shared/components/handcarry-distbursement-order-details/handcarry-distbursement-order-details.component';
import { HandcarryTransactionOrderDetailsComponent } from '../shared/components/handcarry-transaction-order-details/handcarry-transaction-order-details.component';
import { SafeandsecureComponent } from '../safeandsecure/safeandsecure/safeandsecure.component';

const coreRoutes: Routes = [ 
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
    path: 'safeandsecure',
    component: SafeandsecureComponent,
  },
  {
    path: 'reps',
    children: [
      {
        path:'',component: RepComponent
      },
      {
        path:'dtrorders/:id', component: DtrOrderDetailsComponent
      },
      {
        path:'dtporders/:id',
        loadChildren: '../order/order.module#OrderModule'
      },
      {
        path: 'handcarry/disbursement/:id', component: HandcarryDistbursementOrderDetailsComponent
      },
      {
        path: 'handcarry/transaction/:id', component: HandcarryTransactionOrderDetailsComponent
      }
    ],
    
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'hcp/orders',
    children:[
      {
        path:'', component: HcpOrderListComponent
      },
      {
        path:'dtrorders/:id', component: DtrOrderDetailsComponent
      },
      {
        path:'dtporders/:id',
        loadChildren: '../order/order.module#OrderModule'
      },
      {
        path: 'handcarry/disbursement/:id', component: HandcarryDistbursementOrderDetailsComponent
      },
      {
        path: 'handcarry/transaction/:id', component: HandcarryTransactionOrderDetailsComponent
      }
    ],
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'products',
    children:[
      {
        path: '',component: ProductComponent
      },
      {
        path: 'handcarry/disbursement/:id', component: HandcarryDistbursementOrderDetailsComponent
      },
      {
        path: 'handcarry/transaction/:id', component: HandcarryTransactionOrderDetailsComponent
      },
      {
        path:'dtrorders/:id', component: DtrOrderDetailsComponent
      },
      {
        path:'dtporders/:id',
        loadChildren: '../order/order.module#OrderModule'
      }
    ],  
    
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'reports/generated',
    children:[{
      path:'', component: GenerateReportsComponent
    },
    {
      path:'InventoryReturnReceipt', component:ReportDetailsComponent
    }],
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'reports/uploaded',
    component: UploadedReportsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'tasks',
    children:[{
      path:'', component: TasksComponent,
    },
    {
      path:'details',component:TaskDetailsComponent
    }],
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
    // canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '/home', // 404 page?
  }
];

@NgModule({
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
export class RoutingModule { }
