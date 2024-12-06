import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LgccommonModule } from '@lgccommon/public-api';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    LgccommonModule,
    BlocksModule
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})
export class PagesModule { }
