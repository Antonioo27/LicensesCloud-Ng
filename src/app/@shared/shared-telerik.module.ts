import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Telerik Kendo (Progress)
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DatePipe, IntlModule } from '@progress/kendo-angular-intl';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import '@progress/kendo-angular-intl/locales/it/all';
import { LabelModule } from '@progress/kendo-angular-label';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';
import { LayoutModule } from '@progress/kendo-angular-layout';
//import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ButtonsModule,
    GridModule,
    PDFModule,
    DateInputsModule,
    IntlModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    DialogsModule,
    PopupModule,
    TooltipsModule,
    ExcelModule,
  ],
  declarations: [],
  exports: [
    LayoutModule,
    ButtonsModule,
    GridModule,
    PDFModule,
    DateInputsModule,
    IntlModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    DialogsModule,
    PopupModule,
    TooltipsModule,
    ExcelModule,
  ],
  providers: [DatePipe],
})
export class LgcSharedTelerikModule {}
