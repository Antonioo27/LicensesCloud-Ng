import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Customer_GetInfoFromScopeInModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';
import { AdditionalInfo } from '@lgccommon/lib/models/licencesCloud/AdditionalInfo.model';
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

  public getAdditionalInfos(): Promise<AdditionalInfo[]>{
    return new Promise<AdditionalInfo[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/AdditionalInfo/additionalInfos`, this.HttpOptions).subscribe({
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

  public addAdditionalInfo(additionalInfo: AdditionalInfo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${this.BaseUrl_V}/AdditionalInfo/additionalInfo`, additionalInfo, this.HttpOptions).subscribe({
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
