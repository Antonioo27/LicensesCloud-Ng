import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@app/helpers/auth/auth.guard';
import { AuthLoginGuard } from '@app/helpers/auth/auth-login.guard';
import { LayoutComponent } from '@app/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CustomerInfoViewerComponent } from './home/detail/customer-info-viewer.component';

import * as path from 'path';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path:'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children : [
    {
      path: '',
      redirectTo: '/admin/home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'additionalInfo',
      component: AdditionalInfoComponent,
    },
    {
       path: 'home/detail/:id',
       component: CustomerInfoViewerComponent,
    },
    {
      path: 'home/detail',
      redirectTo: '/admin/home',
      pathMatch: 'full',
    }
  ]
  },
  // {
  //    path: 'admin/home/detail',
  //    component: HomeDetailComponent
  // }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
