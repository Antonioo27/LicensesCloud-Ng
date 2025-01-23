import { PersonalInfoViewerComponent } from './personal-info-viewer/personal-info-viewer.component';
import { HomeComponent } from './../home.component';
import { Component, OnInit } from '@angular/core';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '@app/services/customers/customers.service';
import { TabModel } from '@lgccommon/lib/models/TabViewer.model';
import { ScopeComponent } from './scope/scope.component';
import { LicenceViewerComponent } from './licence/licence-viewer.component';
import { ChangeDetectorRef } from '@angular/core';


import { LoginService } from '@app/services/login/login.service';
import { Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

@Component({
  selector: 'app-customer-info-viewer',
  templateUrl: './customer-info-viewer.component.html',
  styleUrls: ['./customer-info-viewer.component.scss']
})
export class CustomerInfoViewerComponent extends HomeComponent implements OnInit {

  public nomeCustomer: string;

  isLoading = true;
  public customerId: number;

  public scopeArray: string[];
  protected tabs: TabModel[] = [];
  public customerInfo: Customer_GetInfoFromScopeInModel[];

  constructor(private customerAdditionalInfo: AdditionalInformationService,customersService: CustomersService, route: ActivatedRoute, loginService: LoginService, private cdr: ChangeDetectorRef ) {
   super(customersService, loginService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const nome = params['name'];
      // Use the value of id here
      this.customerId = +id; // Use the + sign to convert the string to a number
      this.nomeCustomer = nome;
    });
    this.tabs.push({
      titleLabel: 'Informazioni cliente',
      component: PersonalInfoViewerComponent,
      data: {
        customerId: this.customerId
      }
    } as TabModel);
    this.tabs.push({
      titleLabel: 'Informazioni licenza',
      component: LicenceViewerComponent,
      data: {
        customerId: this.customerId
      }
    } as TabModel);

    this.customerAdditionalInfo.getAllScopes().then((data) => {
      this.scopeArray = data;

      this.customerAdditionalInfo.getInfoFromScopes(this.customerId).then((dataCustomer) => {
        this.customerInfo = dataCustomer;

        const scopeMap = new Map<string, Customer_GetInfoFromScopeInModel[]>();
        this.customerInfo.forEach((customer) => {
          const scope = customer.scope;
          if (scopeMap.has(scope)) {
            scopeMap.get(scope).push(customer);
          } else {
            scopeMap.set(scope, [customer]);
          }
        });

        scopeMap.forEach((customers, scope) => {
          this.tabs.push({
            titleLabel: scope,
            component: ScopeComponent,
            data: {
              customerId: this.customerId,
              customerInfo: customers,
            }
          } as TabModel);
        });

        this.isLoading = false;
        this.cdr.detectChanges();

      });
    });
  }

}

