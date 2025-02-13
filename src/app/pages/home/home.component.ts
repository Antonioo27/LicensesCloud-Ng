import { LoginService } from '@app/services/login/login.service';
import { LgccommonModule } from '@lgccommon/public-api';
import { Component, inject, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { CommonDialogComponent } from '@lgccommon/lib/blocks/commondialog/commondialog.component';
import { CommonDialogConfig } from '@lgccommon/lib/blocks/commondialog/commondialog.component';
import { CommonDialogService } from '@lgccommon/lib/blocks/commondialog/commondialog.service';
import { CommonDialogDirective } from '@lgccommon/lib/blocks/commondialog/commondialog.directive';
import { AddCustomerComponent } from '@app/window/add-customer/add-customer.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit{
  public gridData: CustomerModel[] = [];

  public sort: SortDescriptor[] = [
    {
      field: 'user.username', // Impostato l'ordinamento iniziale sulla colonna 'name'
      dir: 'asc'
    }
  ];

  public dialogCommonService = inject(CommonDialogService);


  constructor(protected customersService: CustomersService, private loginService: LoginService) {
    super();

  }

  ngOnInit(): void {
    // Carica i clienti all'inizio
    this.customersService.getCustomers().then((data) => {
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


  onShowDetails(id: number, name: string): void {
    // Naviga in home/detail con l'ID e il nome come parametri di query
    const currentUrl = this.router.url; // Ottieni la rotta attuale
    this.router.navigate([`${currentUrl}/detail`, id ]);
    // Resto del codice per gestire l'evento
  }

  password: string = "";
  username: string = "";

  condizioneBottone: boolean = true;

  public opened = false;

  public close(): void {
    this.opened = false;
  }

   public openDialog():void {
      // var SelectOnlyAssignedProcess = false;
      // var DP_InfoPress_JobsAssToPUOnly_ShowCheckbox = this.confSys_Item.GetAsBool('DP_InfoPress_JobsAssToPUOnly');
      // if(DP_InfoPress_JobsAssToPUOnly_ShowCheckbox && this.filterObj.DP_InfoPress_JobsAssToPUOnly && this.filterObj.DP_InfoPress_JobsAssToPUOnly > 0)
      //   SelectOnlyAssignedProcess = true;

      this.dialogCommonService.Show(
        this.CommonDialog,
        new CommonDialogConfig({
          height: '50%',
          width: '50%',
          title: 'Aggiungi cliente',
          // actions: {
          //   ok: {
          //     action: null,
          //   },
          // },
          contentData: {
          }
        }),
        AddCustomerComponent
      );

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
