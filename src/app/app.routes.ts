import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { StaffPortalComponent } from './components/staff-portal/staff-portal.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'manager', component: ManagerDashboardComponent },
  { path: 'staff', component: StaffPortalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }