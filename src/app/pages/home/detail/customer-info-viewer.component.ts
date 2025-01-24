import { Location } from '@angular/common';
import { PersonalInfoViewerComponent } from './personal-info-viewer/personal-info-viewer.component';
import { HomeComponent } from './../home.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '@app/services/customers/customers.service';
import { TabModel } from '@lgccommon/lib/models/TabViewer.model';
import { ScopeComponent } from './scope/scope.component';
import { LicenceViewerComponent } from './licence/licence-viewer.component';
import { ChangeDetectorRef } from '@angular/core';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

import { LoginService } from '@app/services/login/login.service';
import { Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

import { CacheService } from '@app/services/cache/cache.service';

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
  public customer: CustomerModel;

  constructor(
    private customerAdditionalInfo: AdditionalInformationService,
    customersService: CustomersService,
    route: ActivatedRoute,
    loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private cacheService: CacheService
  ) {
    super(customersService, loginService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // const nome = params['name'];
      this.customerId = +id;
      // this.nomeCustomer = nome;

    });

    this.customersService.getCustomer(this.customerId).then((dataCustomer) => {
      this.customer = dataCustomer;
      this.nomeCustomer=dataCustomer.name
      this.tabs.push({
        titleLabel: 'Informazioni cliente',
        component: PersonalInfoViewerComponent,
        data: {
          customerId: this.customerId,
          customer: this.customer
        }
      } as TabModel);

      this.tabs.push({
        titleLabel: 'Informazioni licenza',
        component: LicenceViewerComponent,
        data: {
          customerId: this.customerId,
          gridDataLicence: this.customer.licence,
          customer: this.customer
        }
      } as TabModel);
    });

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

        var index = 0;
        scopeMap.forEach((customers, scope) => {
          this.tabs.push({
            titleLabel: scope,
            component: ScopeComponent,
            data: {
              customerId: this.customerId,
              customerInfo: customers,
              tabId: 'Scope'+ index,
            }
          } as TabModel);
          index ++;
        });

        this.isLoading = false;
        this.cdr.detectChanges();
      });
    });
  }

  saveAll() {
    this.cacheService.saveAllTabs();
    location.reload();
  }
}
