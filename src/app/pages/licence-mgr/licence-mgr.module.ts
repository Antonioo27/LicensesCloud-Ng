import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenceMgrComponent } from './licence-mgr.component';



@NgModule({
  declarations: [
    LicenceMgrComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LicenceMgrComponent
  ]
})
export class LicenceMgrModule { }
