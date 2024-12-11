import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@app/helpers/auth/auth.guard';
import { AuthLoginGuard } from '@app/helpers/auth/auth-login.guard';
import { LayoutComponent } from '@app/layout/layout.component';
import { HomeComponent } from './home/home.component';

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
      // canActivate: [AuthGuard],
    },
  ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
