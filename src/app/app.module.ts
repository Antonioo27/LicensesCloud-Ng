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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    LgcSharedModule,
    BlocksModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],

  providers: [
    LoginService,
    CredentialsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
