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

  public getAllScopes(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getAllScopes`, this.HttpOptions).subscribe({
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

  public getInfoFromScopes(customerId: number): Promise<Customer_GetInfoFromScopeInModel[]> {
    return new Promise<Customer_GetInfoFromScopeInModel[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getInfoFromScopes/${customerId}`, this.HttpOptions).subscribe({
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

  public updateCustomerAdditionalInfo(customerId: number, list: Customer_GetInfoFromScopeInModel[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.patch(`${this.BaseUrl_V}/Customer/updateCustomerAdditionalInfo/${customerId}`, list, this.HttpOptions).subscribe({
        next: () => {
          resolve();
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {},
      });
    });
  }




}
