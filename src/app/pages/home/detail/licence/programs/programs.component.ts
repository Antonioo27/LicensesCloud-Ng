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

  public opened = false;
  public dataSaved = false;
  public steps: any = { year: 1, day: 1,  hour: 2, minute: 15};
  public value: Date = new Date(2000, 2, 10, 10, 30);

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
  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
  public salvaDate(): void {
    this.dataSaved = true;
    this.close();
    this.licenseType0.forEach(item => {
      item.expiryDate = this.value;
    });
  }
}
