import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class LicencesService extends BaseService {

  constructor() {
    super();
  }


}



// public Login(loginModel: LoginModel): Promise<CredentialMiniModel> {
//   return new Promise<CredentialMiniModel>((resolve, reject) => {
//     this.http.post(`${this.BaseUrl_V}/Login/login`, loginModel, this.HttpOptions).subscribe({
//       next: (value: any) => {
//         let credentialModel = new CredentialMiniModel();
//         credentialModel.Token = value;
//         resolve(credentialModel);
//       },
//       error: (reason: any) => {
//         reject(reason);
//       },
//       complete: () => {},
//     });
//   });
// }
