import { Component } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { LoginService } from '@app/services/login/login.service';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { LgccommonModule } from '@lgccommon/public-api';
import {inject, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { CommonDialogComponent } from '@lgccommon/lib/blocks/commondialog/commondialog.component';
import { CommonDialogConfig } from '@lgccommon/lib/blocks/commondialog/commondialog.component';
import { CommonDialogService } from '@lgccommon/lib/blocks/commondialog/commondialog.service';
import { CommonDialogDirective } from '@lgccommon/lib/blocks/commondialog/commondialog.directive';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent extends BaseComponent {

  public gridData: CustomerModel[] = [];

  password: string = "";
  username: string = "";

  condizioneBottone: boolean = true;

  public opened = false;


  constructor(protected customersService: CustomersService, private loginService: LoginService) {
    super()
  }

  public close(): void {
    this.opened = false;
  }

  public submit(): void {
    this.close();

    if(this.username.trim().length > 0 && this.password.trim().length > 0) {
      this.loginService.Register({ Username: this.username, Password: this.password }).then(() => {
        this.customersService.getCustomers().then((data) => {
          this.gridData = data;
          const currentUrl = this.router.url; // Ottieni la rotta attuale
          const lastIndex = this.gridData.length - 1;
          const lastElementId = this.gridData[lastIndex].id;
          this.router.navigate([`${currentUrl}/detail`, lastElementId]);
        //location.reload();
        });
      }).catch((error) => {
        console.error(error);
      });
    } else {
      alert("Inserire username e password");
    }
  }

}
