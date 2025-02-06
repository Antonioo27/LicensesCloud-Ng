import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LgccommonModule } from '@lgccommon/public-api';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { HomeComponent } from './home/home.component';
import { LgcSharedTelerikModule } from '@app/@shared/shared-telerik.module';
import { LgcSharedModule } from '@app/@shared/shared.module';
import { CustomerInfoViewerComponent } from './home/detail/customer-info-viewer.component';
import { ProgramsComponent } from './home/detail/licence/programs/programs.component';
import { FunctionsComponent } from './home/detail/licence/functions/functions.component';
import { LicenceViewerComponent } from './home/detail/licence/licence-viewer.component';
import { ScopeComponent } from './home/detail/scope/scope.component';
import { FormsModule } from '@angular/forms';
import { PersonalInfoViewerComponent } from './home/detail/personal-info-viewer/personal-info-viewer.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    CustomerInfoViewerComponent,
    LoginComponent,
    ProgramsComponent,
    FunctionsComponent,
    LicenceViewerComponent,
    ScopeComponent,
    PersonalInfoViewerComponent,
    AdditionalInfoComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    LgccommonModule,
    BlocksModule,
    LgcSharedModule
  ],
  exports: [
    HomeComponent,
    CustomerInfoViewerComponent,
    LoginComponent
  ]
})
export class PagesModule { }
