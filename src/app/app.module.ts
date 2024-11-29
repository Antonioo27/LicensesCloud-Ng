import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LgcSharedModule } from './@shared/shared.module';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { LoginService } from './services/login/login.service';
import { CredentialsService } from './services/credentials/credentials.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { AppConfigService } from '@lgccommon/lib/services/app-config.service';
import { APP_INITIALIZER } from '@angular/core';
import { LicenceMgrComponent } from './pages/licence-mgr/licence-mgr.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';

export function loadAppConfigSync() {
  var url = `${environment.base_href}/assets/config/app.config.json`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send(null);
  var resp = JSON.parse(xhr.responseText);

  return resp;
}

var temp = loadAppConfigSync();

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
  ],
  imports: [
    PagesModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    LgcSharedModule,
    BlocksModule,
    FormsModule,
    AppRoutingModule
  ],

  providers: [
    LoginService,
    CredentialsService,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          appConfigService.appConfig = temp;
          return temp;
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
