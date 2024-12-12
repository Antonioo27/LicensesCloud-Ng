import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@lgccommon/lib/models/licencesCloud/User.model';
import { LicenceModel } from '@lgccommon/lib/models/licencesCloud/Licence.model';
import { HomeComponent } from '../home.component';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { ActivatedRoute } from '@angular/router';

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

  idCustomer: number;

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
      this.gridDataLicence = data.licence;

      this.licenceType1 = this.gridDataLicence.items.filter(item => item.type == 1);
      this.licenceType0 = this.gridDataLicence.items.filter(item => item.type == 0);

      console.log(this.gridDataLicence); // Add this line to log the value of gridDataLicence
      this.isLoading = false;
    });
      // console.log(this.gridDataLicence)


  }



}
