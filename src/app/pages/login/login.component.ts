import { Component } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import { BaseComponent } from '@app/components/base/base.component';
import { CredentialsService } from '@app/services/credentials/credentials.service';
import { LoginService } from '@app/services/login/login.service';
import { CredentialMiniModel, LoginModel } from '@lgccommon/lib/models/Credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  loginModel: LoginModel = new LoginModel();
  messages: string[] = [];

  constructor(
    private loginService: LoginService,
    private credentialsService: CredentialsService,
  ) {
    super();
  }

  public Login(alternativeUrl: string = null, forceLocationChange: boolean = false): void {
    this.isLoading = true;
    this.messages = [];
    if (!this.loginModel.Username || !this.loginModel.Password) {
      this.messages = ['Dati non validi.'];
      this.isLoading = false;
    }
    else {
      this.loginService
        .Login(this.loginModel)
        .then((res: CredentialMiniModel) => {
          this.credentialsService.SetCredentials(res);

          // Naviga alla homepage
          var url = this.route.snapshot.queryParams['ReturnUrl'];
          this.router.navigate([url], {
            replaceUrl: true,
          });

        })
        .catch((reason: any) => {
          this.messages = reason.error.Messages;
          if (!this.messages) {
            this.messages = ['Login fallito.'];
          }
        })
        .finally(() => {
          this.isLoading = false;
        })
      }
    }
}
