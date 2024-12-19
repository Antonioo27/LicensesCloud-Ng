import { HomeComponent } from './../home.component';
import { Component, OnInit } from '@angular/core';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { Customer_AdditionalInfo } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '@app/services/customers/customers.service';

@Component({
  selector: 'app-customer-info-viewer',
  templateUrl: './customer-info-viewer.component.html',
  styleUrls: ['./customer-info-viewer.component.scss']
})
export class CustomerInfoViewerComponent extends HomeComponent implements OnInit {

  public nomeCustomer: string;

  public idCustomer: number;

  public scopeArray: string[];

  constructor(private customerAdditionalInfo: AdditionalInformationService,customersService: CustomersService, route: ActivatedRoute) {
   super(customersService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const nome = params['name'];
      // Use the value of id here
      this.idCustomer = +id; // Use the + sign to convert the string to a number
      this.nomeCustomer = nome;
    });
    this.customerAdditionalInfo.getAllScopes(this.idCustomer).then((data) => {
      this.scopeArray = data;
    });
    console.log(this.scopeArray );
  }

  onTabSelect(event: any): void {
    this.customerAdditionalInfo.getInfoFromScope(event.tab.textLabel).then((data) => {
      console.log(data);
    });
  }
}
