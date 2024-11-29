import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LicenceMgrComponent } from './pages/licence-mgr/licence-mgr.component';
// import { ErrorPage } from './pages/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages/licenceMgr',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
