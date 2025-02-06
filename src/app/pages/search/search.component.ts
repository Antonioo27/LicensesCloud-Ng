import { Component } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service'
import { CustomersService } from '@app/services/customers/customers.service';
import { Customer_AdditionalInfo } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent {

  public gridData: Customer_AdditionalInfo[] = [];
  private originalData: Customer_AdditionalInfo[] = [];
  public keySearch: string = '';
  public nameSearch: string = '';
  public valueSearch: string = '';


  public sort: SortDescriptor[] = [
    {
      field: 'key', // Impostato l'ordinamento iniziale sulla colonna 'key'
      dir: 'asc'
    }
  ];

  constructor(private additionalInfoService: AdditionalInformationService, private customerService: CustomersService) {
      super()
  }

  ngOnInit(): void {
    // Carica le additionalInfo all'inizio
    this.customerService.getAllCustomerAdditionalInfo().then((data) => {
      this.gridData = data;
      this.originalData = data;
      this.applySort(); // Applica l'ordinamento sui dati appena caricati
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort; // Salva l'ordinamento scelto dall'utente
    this.applySort(); // Applica l'ordinamento
  }

  // Funzione per applicare l'ordinamento
  private applySort(): void {
    this.gridData = orderBy(this.gridData, this.sort);
  }

  public updateFilter(): void {
     // Filtro applicato sui dati originali
     this.gridData = this.originalData.filter(item => {
      let matches = true;

      // Se è presente un valore per la chiave, filtra per 'key'
      if (this.keySearch) {
        matches = matches && item.key?.toLowerCase().includes(this.keySearch.toLowerCase());
      }

      // Se è presente un valore per 'value', filtra per 'value'
      if (this.valueSearch) {
        matches = matches && item.value?.toLowerCase().includes(this.valueSearch.toLowerCase());
      }

      // Se è presente un valore per il nome, filtra per 'customer.user.username'
      if (this.nameSearch) {
        matches = matches && item.customer?.user?.username?.toLowerCase().includes(this.nameSearch.toLowerCase());
      }

      return matches;
    });

    // Applica l'ordinamento anche ai dati filtrati
    this.applySort();
  }

}
