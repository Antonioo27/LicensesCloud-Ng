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
  @Input() customerInfo: Customer_GetInfoFromScopeInModel[];
  @Input() customer: CustomerModel;


  @Input() tabId: string;

  protected scopeData: Customer_GetInfoFromScopeInModel[] = [];

  constructor(customersService: CustomersService, private additionalInformationService: AdditionalInformationService, private cacheService: CacheService, loginService: LoginService) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    this.scopeData = this.customerInfo;
    console.log(this.scopeData);
    this.cacheService.registerComponent(this.tabId, this);
  }

  getNumber(value: string): number | null {
    return value ? parseInt(value, 10) : null;
  }

  setNumber(scopeData: Customer_GetInfoFromScopeInModel, newValue: number): void {
    scopeData.value = newValue !== null ? newValue.toString() : '';
  }


  salva() {
    this.scopeData.forEach(item => {
      if (item.type === 0 && typeof item.value === 'number') {
        item.value = (item.value as any).toString();
      }
      // console.log(this.scopeData.updatedComputed);
    });
    this.additionalInformationService.updateCustomerAdditionalInfo(this.customerId, this.scopeData)
      .then(
        (response) => {
          console.log("Metodo andato a buon fine");
        },
        (error) => {
          // Handle error response
        }
      )
      .then(() => {
        this.cacheService.unregisterComponent(this.tabId);
      });
  }

  setBoolean(scopeData: Customer_GetInfoFromScopeInModel, intero: number): void{
    scopeData.value = intero !== null ? intero.toString() : '';
  }

}
