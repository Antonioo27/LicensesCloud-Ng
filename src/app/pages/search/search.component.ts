import { Component } from '@angular/core';
import { BaseComponent } from '@app/components/base/base.component';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service'
import { AdditionalInfo } from '@lgccommon/lib/models/licencesCloud/AdditionalInfo.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent {

constructor(private additionalInfoService: AdditionalInformationService) {
    super()
  }
  ngOnInit(): void {

  }
}
