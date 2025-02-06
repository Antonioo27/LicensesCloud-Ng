import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { Customer_AdditionalInfo, Customer_GetInfoFromScopeInModel, CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService {

  constructor() {
    super()
  }

  // Implementare return new Promise e CustomerModel
  public getCustomers(): Promise<CustomerModel[]>  {
    return new Promise<CustomerModel[]>((resolve, reject) => {
        this.http.get(`${this.BaseUrl_V}/Customer/customers`, this.HttpOptions).subscribe({
          next: (value: CustomerModel[]) => {
            resolve(value);
          },
          error: (reason: any) => {
            reject(reason);
          },
          complete: () => {},
        });
      }
    );
  }

  public getCustomer(id: number): Promise<CustomerModel>  {
    return new Promise<CustomerModel>((resolve, reject) => {
        this.http.get(`${this.BaseUrl_V}/Customer/customer/${id}`, this.HttpOptions).subscribe({
          next: (value: CustomerModel) => {
            resolve(value);
          },
          error: (reason: any) => {
            reject(reason);
          },
          complete: () => {},
        });
      }
    );
  }

  public updateCustomer(customer: CustomerModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.patch(`${this.BaseUrl_V}/Customer/update`, customer, this.HttpOptions).subscribe({
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
  public getAllCustomerAdditionalInfo(): Promise<Customer_AdditionalInfo[]>  {
    return new Promise<Customer_AdditionalInfo[]>((resolve, reject) => {
      this.http.get(`${this.BaseUrl_V}/Customer/getAllCustomerAdditionalInfo`, this.HttpOptions).subscribe({
        next: (value:any) => {
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
