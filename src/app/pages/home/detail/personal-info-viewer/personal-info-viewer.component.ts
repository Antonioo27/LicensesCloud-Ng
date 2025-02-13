import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../home.component';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { CustomersService } from '@app/services/customers/customers.service';
import { LoginService } from '@app/services/login/login.service';
import { CacheService } from '@app/services/cache/cache.service';
@Component({
  selector: 'app-personal-info-viewer',
  templateUrl: './personal-info-viewer.component.html',
  styleUrls: ['./personal-info-viewer.component.scss']
})
export class PersonalInfoViewerComponent extends HomeComponent implements OnInit  {
  @Input() customerId: number;

  protected isLoading: boolean;
  @Input() customer: CustomerModel;

  @Input() tabId = 'personalInfo';

  public maxlength = 11;
  public charachtersCount = 0;
  public counter = `${this.charachtersCount}/${this.maxlength}`;

  public onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  constructor(customersService: CustomersService, loginService: LoginService, private cacheService: CacheService) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    //this.isLoading = true;
    this.cacheService.registerComponent(this.tabId, this);
    this.checkIVA();
  }


  salva(): void {
    if(this.cacheService.getCacheEnabled()){
      this.customersService.updateCustomer(this.customer)
      .then(() => {
        // For example, you can show a success message or navigate to another page
          this.cacheService.unregisterComponent(this.tabId);
      })
      .catch((reason) => {
        console.error(reason);
      });
    }else{
      this.cacheService.setCacheEnabled(false);
    }
  }

  checkIVA(): void {
    if (!this.customer || !this.customer.partitaIva || !/^\d{11}$/.test(this.customer.partitaIva)) {
      console.log(this.customer.partitaIva);
      this.cacheService.setCacheEnabled(false);
    } else {
      this.cacheService.setCacheEnabled(true);
    }
  }

}
