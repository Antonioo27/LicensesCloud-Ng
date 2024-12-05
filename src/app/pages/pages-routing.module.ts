import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthBaseGuard } from '@app/helpers/auth/auth-base.guard';
import { LicenceMgrComponent } from './licence-mgr/licence-mgr.component';
import { AuthGuard } from '@app/helpers/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: LicenceMgrComponent,
    canActivate: [AuthGuard],
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
