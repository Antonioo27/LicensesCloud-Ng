import { Component } from '@angular/core';
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

  public Login() {
    this.isLoading = true;
    this.messages = [];
    this.loginService
      .Login(this.loginModel)
      .then((res: CredentialMiniModel) => {
        this.credentialsService.SetCredentials(res);
      })
      .catch((reason: any) => {
        this.messages = reason.error.Messages;
      })
      .finally(() => {
        this.isLoading = false;
      })
  }
}
