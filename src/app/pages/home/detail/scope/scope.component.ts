import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { Component, Input, OnInit } from '@angular/core';
import { Customer_AdditionalInfo, Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { CacheService } from '@app/services/cache/cache.service';
import { CustomersService } from '@app/services/customers/customers.service';
import { HomeComponent } from '../../home.component';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { LoginService } from '@app/services/login/login.service';


@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent extends HomeComponent implements OnInit {
  @Input() customerId: number;
  @Input() customerInfo: Customer_AdditionalInfo[];
  @Input() customer: CustomerModel;


  @Input() tabId: string;

  protected scopeData: Customer_GetInfoFromScopeInModel[] = [];

  constructor(customersService: CustomersService, private additionalInformationService: AdditionalInformationService, private cacheService: CacheService, loginService: LoginService) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    this.scopeData = this.customerInfo;
    this.cacheService.registerComponent(this.tabId, this);
  }

  ngOnDestroy(): void {
    this.cacheService.unregisterComponent(this.tabId);
  }

  salva() {
    this.customersService.updateCustomer(this.customer).then(() => {
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
