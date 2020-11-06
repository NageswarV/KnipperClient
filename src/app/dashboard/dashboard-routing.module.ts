import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';
import { SamplicityPermission } from '../common/permissions';
import { DashboardDetailComponent } from './dashboard/dashboard-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {
      permissions: [SamplicityPermission.Dashboard.DashboardView]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule { }
