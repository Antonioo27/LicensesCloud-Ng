import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@lgccommon/lib/models/licencesCloud/User.model';
import { LicenceModel } from '@lgccommon/lib/models/licencesCloud/Licence.model';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {

  @Input() gridData: LicenceModel ;

  ngOnInit(): void {
  }

}
