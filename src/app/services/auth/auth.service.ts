import { Injectable } from '@angular/core';
import { CredentialMiniModel } from '@lgccommon/lib/models/Credentials.model';
import { BaseService } from '../base/base.service';
import { HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private httpContext: HttpContext) { super(); }

  public isAuthenticated(): Promise<CredentialMiniModel> {
    return new Promise<CredentialMiniModel>((resolve, reject) => {
      if(this.credentialsService.credentials) {
        this.http.post(`${this.BaseUrl_V}/Login/isLoggedIn`, { token: this.credentialsService.credentials.Token,  }, this.HttpOptions).subscribe(
          {
            next: (value: CredentialMiniModel) => {
              if(value && value.Token)
                resolve(value);
              else
                resolve(null);
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
