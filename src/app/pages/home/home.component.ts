import { LgccommonModule } from '@lgccommon/public-api';
import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit{

  public gridData: CustomerModel[] = [];

  constructor(private customersService:CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customersService.getCustomers().then((data) => {
      this.gridData = data;
    });
  }
}
