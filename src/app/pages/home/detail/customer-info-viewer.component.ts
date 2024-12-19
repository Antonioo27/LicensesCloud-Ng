import { HomeComponent } from './../home.component';
import { Component, OnInit } from '@angular/core';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '@app/services/customers/customers.service';
import { TabModel } from '@lgccommon/lib/models/TabViewer.model';
import { ScopeComponent } from './scope/scope.component';
import { LicenceViewerComponent } from './licence/licence-viewer.component';

@Component({
  selector: 'app-customer-info-viewer',
  templateUrl: './customer-info-viewer.component.html',
  styleUrls: ['./customer-info-viewer.component.scss']
})
export class CustomerInfoViewerComponent extends HomeComponent implements OnInit {

  public nomeCustomer: string;

  public customerId: number;

  public scopeArray: string[];
  protected tabs: TabModel[] = [];

  constructor(private customerAdditionalInfo: AdditionalInformationService,customersService: CustomersService, route: ActivatedRoute) {
   super(customersService);
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
      titleLabel: 'Informazioni licenza',
      component: LicenceViewerComponent,
      data: {
        customerId: this.customerId
      }
    } as TabModel);
    this.customerAdditionalInfo.getAllScopes(this.customerId).then((data) => {
      this.scopeArray = data;
      let newTabs = this.scopeArray.map((scope) => {
        return {
          titleLabel: scope,
          component: ScopeComponent,
          data: {
            customerId: this.customerId,
            scope: scope
          }
        }
      });
      this.tabs.push(...newTabs);
    });
  }
}
