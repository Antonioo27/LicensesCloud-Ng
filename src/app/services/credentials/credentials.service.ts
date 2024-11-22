import { Injectable, Injector } from '@angular/core';
import { CredentialMiniModel } from '@lgccommon/lib/models/Credentials.model';
import { BS_People } from '@lgccommon/lib/models/People.model';

const credentialsKey = 'cloud-licenses-credentials';
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  get credentials(): CredentialMiniModel | null {
    const savedCredentials =
      localStorage.getItem(credentialsKey);
    if (savedCredentials && savedCredentials != 'null') {
      return Object.assign(new CredentialMiniModel(), JSON.parse(savedCredentials));
    }
    return null;
  }

  /**
   * SetCredentials
   */
  public SetCredentials(data: any) {
    localStorage.setItem(credentialsKey, JSON.stringify(data));
  }
}
