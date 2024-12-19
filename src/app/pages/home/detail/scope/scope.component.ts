import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { Component, Input, OnInit } from '@angular/core';
import { Customer_AdditionalInfo, Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent implements OnInit {
  @Input() customerId: number;
  @Input() scope: string;

  protected scopeData: Customer_GetInfoFromScopeInModel[] = [];

  constructor(private additionalInformationService: AdditionalInformationService) {}

  ngOnInit(): void {
    this.additionalInformationService.getInfoFromScope(this.customerId, this.scope).then((data) => {
      this.scopeData = data;
    });
  }

}
