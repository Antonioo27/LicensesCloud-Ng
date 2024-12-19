import { Component, Input, OnInit } from '@angular/core';
import { LicenceModel } from '@lgccommon/lib/models/licencesCloud/Licence.model';
import { HomeComponent } from '../../home.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
@Component({
  selector: 'app-licence-viewer',
  templateUrl: './licence-viewer.component.html',
  styleUrls: ['./licence-viewer.component.scss']
})
export class LicenceViewerComponent extends HomeComponent implements OnInit {
  @Input() customerId: number;

  gridDataLicence: LicenceModel;
  licenceType1 = [];
  licenceType0 = [];
  protected isLoading: boolean;
  customer: CustomerModel;

  constructor(customersService:CustomersService) {
    super(customersService);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customersService.getCustomer(this.customerId).then((data) => {
      //data è il customer
      this.customer = data;
      this.gridDataLicence = data.licence;

      this.licenceType1 = this.gridDataLicence.items.filter(item => item.type == 1);
      this.licenceType0 = this.gridDataLicence.items.filter(item => item.type == 0);

      this.isLoading = false;
    });
      // console.log(this.gridDataLicence)
  }

  salva() {
    this.gridDataLicence.items = [...this.licenceType0, ...this.licenceType1]; //concateno gli array che precedentemente ho filtrato
    this.customer.licence = this.gridDataLicence;
    this.customersService.updateCustomer(this.customer)
    .then(() => {
      // Code to execute after the licence update is successful
      // For example, you can show a success message or navigate to another page

        this.router.navigate(["admin/home"], {
          replaceUrl: true,
        });
    })
    .catch((reason) => {
      console.error(reason);
    });
  }
}
