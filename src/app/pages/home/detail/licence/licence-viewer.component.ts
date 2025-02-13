import { CacheService } from './../../../../services/cache/cache.service';
import { LoginService } from '@app/services/login/login.service';
import { Component, Input, OnInit } from '@angular/core';
import { LicenceModel } from '@lgccommon/lib/models/licencesCloud/Licence.model';
import { HomeComponent } from '../../home.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { DateTime } from 'luxon';//
import { FormatSettings } from '@progress/kendo-angular-dateinputs';


@Component({
  selector: 'app-licence-viewer',
  templateUrl: './licence-viewer.component.html',
  styleUrls: ['./licence-viewer.component.scss']
})
export class LicenceViewerComponent extends HomeComponent implements OnInit {
  @Input() customerId: number;
  @Input() customer: CustomerModel;
  gridDataLicence: LicenceModel;

  @Input() tabId = 'licenceInfo';

  licenceType1 = [];
  licenceType0 = [];
  protected isLoading: boolean;

  formattedExpiryDate: any = null; // Valore usato nel binding
  date: Date | DateTime;

  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy HH:mm',
    inputFormat: 'dd/MM/yyyy HH:mm',
  };

  constructor(customersService:CustomersService, loginService: LoginService, private cacheService: CacheService) {
    super(customersService, loginService);
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.gridDataLicence = this.customer.licence;

    this.licenceType1 = this.gridDataLicence.items.filter(item => item.type == 1);
    this.licenceType0 = this.gridDataLicence.items.filter(item => item.type == 0);
    this.onExpiryDateChange(this.gridDataLicence.expiryDate);
    this.cacheService.registerComponent(this.tabId, this);
    this.isLoading = false;
  }

  onExpiryDateChange(newValue: any) {
    console.log('la data è' + newValue);
    this.gridDataLicence.expiryDate = newValue ? new Date(newValue) : null;
    this.formattedExpiryDate = this.gridDataLicence.expiryDate ? this.gridDataLicence.expiryDate.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    }) : null;
    this.gridDataLicence.expiryDate = this.convertToDate(this.formattedExpiryDate).toJSDate();
    console.log('la nuova data è' + this.gridDataLicence.expiryDate);
  }


  convertToDate(dateString: string): DateTime {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    this.date = DateTime.fromObject({ year, month: month , day, hour: hours, minute: minutes });
    return this.date
  }



  salva() {
    this.gridDataLicence.items = [...this.licenceType0, ...this.licenceType1]; //concateno gli array che precedentemente ho filtrato
    this.customer.licence = this.gridDataLicence;
    this.customersService.updateCustomer(this.customer)
    .then(() => {
      this.cacheService.unregisterComponent(this.tabId);
    })
    .catch((reason) => {
      console.error(reason);
    });
  }

}
