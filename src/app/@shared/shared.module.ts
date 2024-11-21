import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { LgccommonModule } from '@lgccommon/public-api';

import { HeaderTitleComponent } from './header-title/header-title.component';
import { LoaderComponent } from './loader/loader.component';

import { environment } from '@env/environment';
import { LgcSharedTelerikModule } from './shared-telerik.module';
import { CommonDialogDirective } from '@lgccommon/lib/blocks/commondialog/commondialog.directive';
import { LuxonModule } from 'luxon-angular';
import { CommonDialogContentDirective } from '@lgccommon/lib/blocks/commondialog/commondialogcontent.directive';
import { Title } from '@angular/platform-browser';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    BlocksModule,
    LgccommonModule.forRoot({ version: environment.version }),
    LuxonModule,
  ],
  providers: [Title],
  declarations: [
    CommonDialogDirective,
    CommonDialogContentDirective,
    LoaderComponent, HeaderTitleComponent],
  exports: [
    CommonDialogDirective,
    CommonDialogContentDirective,
    LoaderComponent,
    HeaderTitleComponent,
    LgccommonModule,
    LgcSharedTelerikModule,
    TranslateModule,
    LuxonModule,
  ],
})
export class LgcSharedModule {}
