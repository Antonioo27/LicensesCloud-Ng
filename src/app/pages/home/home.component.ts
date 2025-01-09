import { LoginService } from '@app/services/login/login.service';
import { LgccommonModule } from '@lgccommon/public-api';
import { Component, inject, OnInit, Input, Output, EventEmitter  } from '@angular/core';
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
  showHomeDetail: boolean = false; // Proprietà per controllare la visibilità

  constructor(protected customersService: CustomersService, private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
    this.customersService.getCustomers().then((data) => {
      this.gridData = data;
    });
  }

  onShowDetails(id: number, name: string): void {
    // Naviga in home/detail con l'ID e il nome come parametri di query
    const currentUrl = this.router.url; // Ottieni la rotta attuale
    this.router.navigate([`${currentUrl}/detail`, id, name ]);
    // Resto del codice per gestire l'evento
  }

  password: string = "";
  username: string = "";

  condizioneBottone: boolean = true;

  public opened = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    this.close();
    if(this.username.trim().length > 0 && this.password.trim().length > 0) {
      this.loginService.Register({ Username: this.username, Password: this.password }).then(() => {
        location.reload();
      }).catch((error) => {
        console.error(error);
      });
    } else {
      alert("Inserire username e password");
    }
  }
}
