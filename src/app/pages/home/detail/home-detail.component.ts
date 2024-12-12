import { LicencesService } from './../../../services/licences/licences.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@lgccommon/lib/models/licencesCloud/User.model';
import { LicenceModel } from '@lgccommon/lib/models/licencesCloud/Licence.model';
import { HomeComponent } from '../home.component';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent extends HomeComponent implements OnInit {
  // @Input id_customer
  gridDataLicence: LicenceModel;
  licenceType1 = [];
  licenceType0 = [];
  protected isLoading: boolean;
  idCustomer: number;
  customer: CustomerModel;

  constructor(customersService:CustomersService, route: ActivatedRoute) {
    super(customersService);
  }

  ngOnInit(): void {
    // Preleva i parametri di query
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the value of id here
      this.idCustomer = +id; // Use the + sign to convert the string to a number
    });
    this.isLoading = true;
    this.customersService.getCustomer(this.idCustomer).then((data) => {
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
