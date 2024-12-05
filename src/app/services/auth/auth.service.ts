import { Injectable } from '@angular/core';
import { CredentialMiniModel } from '@lgccommon/lib/models/Credentials.model';
import { BaseService } from '../base/base.service';
import { HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if(this.credentialsService.credentials) {
        this.http.post(`${this.BaseUrl_V}/Login/isLoggedIn`, { token: this.credentialsService.credentials.Token }, this.HttpOptions).subscribe(
          {
            next: (value: boolean) => {
              resolve(value);
            },
            error: (reason: any) => {
              reject(reason);
            },
            complete: () => {
            }
          }
        );
      }
      else
      {
        resolve(null);
      }
    });
  }
}
