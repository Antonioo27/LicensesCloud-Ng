import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { CustomerModel } from '@lgccommon/lib/models/licencesCloud/Customer.model';

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
        this.http.get(`${this.BaseUrl_V}/Customer`, this.HttpOptions).subscribe({
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

}
