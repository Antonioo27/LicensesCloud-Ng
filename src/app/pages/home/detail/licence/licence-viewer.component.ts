import { CacheService } from './../../../../services/cache/cache.service';
import { LoginService } from '@app/services/login/login.service';
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
  @Input() customer: CustomerModel;
  gridDataLicence: LicenceModel;

  @Input() tabId = 'licenceInfo';

  licenceType1 = [];
  licenceType0 = [];
  protected isLoading: boolean;

  constructor(customersService:CustomersService, loginService: LoginService, private cacheService: CacheService) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.gridDataLicence = this.customer.licence;

    this.licenceType1 = this.gridDataLicence.items.filter(item => item.type == 1);
    this.licenceType0 = this.gridDataLicence.items.filter(item => item.type == 0);
    this.gridDataLicence.expiryDate = new Date(this.gridDataLicence.expiryDate);
    this.cacheService.registerComponent(this.tabId, this);
    this.isLoading = false;
    // console.log(this.gridDataLicence)

  }

  ngOnDestroy(): void {
    this.cacheService.unregisterComponent(this.tabId);
  }


  salva() {
    this.gridDataLicence.items = [...this.licenceType0, ...this.licenceType1]; //concateno gli array che precedentemente ho filtrato
    this.customer.licence = this.gridDataLicence;
    this.customersService.updateCustomer(this.customer)
    .then(() => {
        this.router.navigate(["admin/home"], {
          replaceUrl: true,
        });
    })
    .catch((reason) => {
      console.error(reason);
    });
  }

}
