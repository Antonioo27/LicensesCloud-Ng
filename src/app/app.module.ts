import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProvaComponent } from './prova/prova.component';
import { LgcSharedModule } from './@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ProvaComponent
  ],
  imports: [
    BrowserModule,
    LgcSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
