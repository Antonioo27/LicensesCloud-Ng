import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenceMgrComponent } from './licence-mgr/licence-mgr.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LgccommonModule } from '@lgccommon/public-api';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';



@NgModule({
  declarations: [
    LicenceMgrComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    LgccommonModule,
    BlocksModule
  ],
  exports: [
    LicenceMgrComponent,
    LoginComponent
  ]
})
export class PagesModule { }
