import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../home.component';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { CustomersService } from '@app/services/customers/customers.service';
import { LoginService } from '@app/services/login/login.service';

@Component({
  selector: 'app-personal-info-viewer',
  templateUrl: './personal-info-viewer.component.html',
  styleUrls: ['./personal-info-viewer.component.scss']
})
export class PersonalInfoViewerComponent extends HomeComponent implements OnInit  {
  @Input() customerId: number;

  protected isLoading: boolean;
  customer: CustomerModel;

  public maxlength = 11;
  public charachtersCount = 0;
  public counter = `${this.charachtersCount}/${this.maxlength}`;

  public onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  constructor(customersService: CustomersService, loginService: LoginService) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customersService.getCustomer(this.customerId).then((data) => {
      //data è il customer
      this.customer = data;
      this.isLoading = false;
    });
      // console.log(this.gridDataLicence)
  }
  salva() {
    if(this.customer.partitaIva.length == 11 && /^\d{11}$/.test(this.customer.partitaIva)){
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
    }else{
      alert("Numero di Partita Iva non valido");
    }
  }

}
