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
  showHomeDetail: boolean = false; // Proprietà per controllare la visibilità


  constructor(protected customersService:CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.customersService.getCustomers().then((data) => {
      this.gridData = data;
    });
  }

  onShowDetails(id: number): void {
    // Naviga in home/detail con l'ID come parametro di query
    const currentUrl = this.router.url; // Ottieni la rotta attuale
    this.router.navigate([`${currentUrl}/detail`, id]);
    // this.router.navigate([`${currentUrl}/detail:${id}`]); // Aggiungi il segmento "admin" e l'ID come parte della rotta
    // Resto del codice per gestire l'evento
  }
}
