import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LgcSharedModule } from '../../@shared/shared.module';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,

    LgcSharedModule,
    BlocksModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
