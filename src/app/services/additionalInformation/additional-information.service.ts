import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
@Injectable({
  providedIn: 'root'
})
export class AdditionalInformationService extends BaseService{

  constructor() {
    super();
  }

  public getAllScopes(costumerId: number): Promise<string[]> {
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

  public getInfoFromScope(customerId: number, scope: string): Promise<Customer_GetInfoFromScopeInModel[]> {
    return new Promise<Customer_GetInfoFromScopeInModel[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getInfoFromScope/${customerId}/${scope}`, this.HttpOptions).subscribe({
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
