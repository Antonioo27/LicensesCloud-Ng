import { Component, ChangeDetectorRef  } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { LoginService } from '@app/services/login/login.service';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service'
import { AdditionalInfo } from '@lgccommon/lib/models/licencesCloud/AdditionalInfo.model';
import { TypeEnum } from '@lgccommon/lib/models/licencesCloud/Customer.model';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent extends BaseComponent{

  public gridData: AdditionalInfo[] = [];

  typeOptions: string[] = ['Int', 'String', 'Bool'];

  public isAuthorized: boolean = false;

  public passwordInput: string = '';

  private readonly correctPassword: string = 'admin';

  public windowHeight: number = 250;


  scopeKey: string;
  scopeLabel: string;
  label: string;
  key: string;
  type: TypeEnum;
  readOnly: boolean = false;
  script: string = "";
  regex: string;

  public sort: SortDescriptor[] = [
    {
      field: 'key', // Impostato l'ordinamento iniziale sulla colonna 'key'
      dir: 'asc'
    }
  ];



  constructor(protected customersService: CustomersService, private loginService: LoginService, private additionalInfoService: AdditionalInformationService, private cdr: ChangeDetectorRef) {
    super()
  }

  ngOnInit(): void {
    // Carica le additionalInfo all'inizio
    this.additionalInfoService.getAdditionalInfos().then((data) => {
      this.gridData = data;
      this.applySort(); // Applica l'ordinamento sui dati appena caricati
    });
  }

  // Gestisce l'ordinamento
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort; // Salva l'ordinamento scelto dall'utente
    this.applySort(); // Applica l'ordinamento
  }

  // Funzione per applicare l'ordinamento
  private applySort(): void {
    this.gridData = orderBy(this.gridData, this.sort);
  }

  public opened = false;

  public close(): void {
    this.opened = false;
    this.isAuthorized = false;
    this.passwordInput = '';
    this.windowHeight = 250;

    // Reset eventuali altri campi se necessario
  }

  public open(): void {
    this.opened = true;
    this.isAuthorized = false;  // Reset dell'autorizzazione ad ogni apertura
    this.passwordInput = '';
    this.windowHeight = 250;    // Altezza iniziale per la password

  }

  public checkPassword(): void {
    if (this.passwordInput === this.correctPassword) {
      this.isAuthorized = true;
      this.windowHeight = 600;

    } else {
      alert('Password non corretta. Riprova.');
      // Puoi opzionalmente resettare il campo password
      this.passwordInput = '';
    }
  }


  public onTypeChange(selectedValue: string): void {
    switch (selectedValue) {
      case 'Int':
        this.type = TypeEnum.Int;
        break;
      case 'String':
        this.type = TypeEnum.String;
        break;
      case 'Bool':
        this.type = TypeEnum.Bool;
        break;
      default:
        this.type = TypeEnum.String; // Impostato a default come String se non corrisponde
    }
  }

  public submit(): void {
    if (!this.isAuthorized) {
      alert('Non sei autorizzato a procedere.');
      return;
    }
    this.close();
      this.readOnly = this.readOnly? true : false;
      this.additionalInfoService.addAdditionalInfo({
        key: this.key, label: this.label, scopeKey: this.scopeKey,
        scopeLabel: this.scopeLabel, type: this.type, readOnly: this.readOnly,
        script: this.script, regex: this.regex
      }).then(() => {
        console.log("Aggiunta correttamente");
        location.reload();
      }).catch((error) => {
        console.error(error);
      });
  }

}
