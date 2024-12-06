import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService {

  constructor() {
    super()
  }

  // Implementare return new Promise e CustomerModel
  public getCustomers(): Promise<any[]>  {
    return new Promise<any>((resolve, reject) => {
        this.http.get(`${this.BaseUrl_V}/Customer`, this.HttpOptions).subscribe({
          next: (value: any) => {
            resolve(value);
            console.log(value)
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
