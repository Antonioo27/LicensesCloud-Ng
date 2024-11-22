import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProvaComponent } from './prova/prova.component';
import { LgcSharedModule } from './@shared/shared.module';
import { BlocksModule } from '@lgccommon/lib/blocks/blocks.module';
import { Forms } from '@lgccommon/lib/models/quality/quality.model';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ProvaComponent,
  ],
  imports: [
    BrowserModule,
    LgcSharedModule,
    BlocksModule,
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
