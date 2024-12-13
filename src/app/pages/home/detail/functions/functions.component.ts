import { Component, Input } from '@angular/core';
import { LicenceItem } from '@lgccommon/lib/models/licencesCloud/Licence.model';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent {
  @Input() licenseType1 = [];

  constructor() {

  }

  setEnabled(dataItem: LicenceItem, e: Event) {
    dataItem.enabled = !!e;
  }

}
