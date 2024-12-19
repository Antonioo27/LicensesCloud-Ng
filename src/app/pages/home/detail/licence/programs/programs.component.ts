import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LicenceItem } from '@lgccommon/lib/models/licencesCloud/Licence.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  @Input() licenseType0 = [];

  @Input()  isLoading: boolean;

  ngOnInit(): void {
    // while(!this.isLoading){
      this.licenseType0.forEach(item => {
          let date = this.convertiStringData(item.expiryDate);
          item.expiryDate = date
      });
    // }
  }

  changeEnabled(){
    this.licenseType0[0].enabled = (!this.licenseType0[0].enabled)
  }
  // onChangeEnabled() {
  //   this.licenseType0.enabled = !(this.licenseType0.enabled);
  // }
  convertiStringData(data: string){
    return new Date(data);
  }
  // set date(data: string){

  // }

  setEnabled(dataItem: LicenceItem, e: Event){
    dataItem.enabled = !!e;
  }

}
