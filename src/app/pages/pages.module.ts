import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LgccommonModule } from '@lgccommon/public-api';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { HomeComponent } from './home/home.component';
import { LgcSharedTelerikModule } from '@app/@shared/shared-telerik.module';
import { LgcSharedModule } from '@app/@shared/shared.module';
import { HomeDetailComponent } from './home/detail/home-detail.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeDetailComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    LgccommonModule,
    BlocksModule,
    LgcSharedModule
  ],
  exports: [
    HomeComponent,
    HomeDetailComponent,
    LoginComponent
  ]
})
export class PagesModule { }
