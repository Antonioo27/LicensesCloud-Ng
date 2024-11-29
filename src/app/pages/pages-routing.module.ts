import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthBaseGuard } from '@app/helpers/auth/auth-base.guard';
import { LicenceMgrComponent } from './licence-mgr/licence-mgr.component';
import { AuthGuard } from '@app/helpers/auth/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: '',
        redirectTo: '/pages/licenceMgr',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthBaseGuard],
      },
      {
        path: 'licenceMgr',
        component: LicenceMgrComponent,
        canActivate: [AuthGuard],
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
