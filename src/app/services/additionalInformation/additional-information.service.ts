import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Customer_GetInfoFromScopeOutModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
@Injectable({
  providedIn: 'root'
})
export class AdditionalInformationService extends BaseService{

  constructor() {
    super();
  }

  public getAllScopes(costumerId: number): Promise<any> {
    return new Promise<string[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getAllScopes/${costumerId}`, this.HttpOptions).subscribe({
        next: (value: any) => {
          resolve(value);
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {},
      });
    });
  }

  public getInfoFromScope(scope: string): Promise<any> {
    return new Promise<Customer_GetInfoFromScopeOutModel[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getInfoFromScope/${scope}`, this.HttpOptions).subscribe({
        next: (value: any) => {
          resolve(value);
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {},
      });
    });
  }


}
