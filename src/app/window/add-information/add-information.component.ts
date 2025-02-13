import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AdditionalInfo, TypeEnum } from '@lgccommon/lib/models/licencesCloud/AdditionalInfo.model';
import { BaseComponent } from '@app/components/base/base.component';
import { CustomersService } from '@app/services/customers/customers.service';
import { LoginService } from '@app/services/login/login.service';
import { AdditionalInformationService } from '@app/services/additionalInformation/additional-information.service';
import { CommonDialogService } from '@lgccommon/lib/blocks/commondialog/commondialog.service';



@Component({
  selector: 'app-window',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss']
})
export class AddInformationComponent extends BaseComponent {

  public gridData: AdditionalInfo[] = [];

  typeOptions: string[] = ['Int', 'String', 'Bool'];

  public isAuthorized: boolean = false;

  public passwordInput: string = '';

  private readonly correctPassword: string = 'admin';

  public windowHeight: number = 250;

  public passwordVisibility: boolean = false;


  scopeKey: string;
  scopeLabel: string;
  label: string;
  key: string;
  type: TypeEnum;
  readOnly: boolean = false;
  script: string = "";
  regex: string = "";

  constructor(protected customersService: CustomersService, private loginService: LoginService, private additionalInfoService: AdditionalInformationService, private dialogCommonService: CommonDialogService, private cdr: ChangeDetectorRef) {
    super()
  }


  public onTypeChange(selectedValue: string): void {
    switch (selectedValue) {
      case 'Int':
        this.type = TypeEnum.Int;
        break;
      case 'String':
        this.type = TypeEnum.String;
        break;
      case 'Bool':
        this.type = TypeEnum.Bool;
        break;
      default:
        this.type = TypeEnum.String; // Impostato a default come String se non corrisponde
    }
  }

  public opened = false;

  public checkPassword(): void {
    if (this.passwordInput === this.correctPassword) {
      this.isAuthorized = true;
      this.windowHeight = 600;

    } else {
      alert('Password non corretta. Riprova.');
      // Puoi opzionalmente resettare il campo password
      this.passwordInput = '';
    }
  }

  public close(): void {
    this.opened = false;
    this.isAuthorized = false;
    this.passwordInput = '';
    this.windowHeight = 250;

    // Reset eventuali altri campi se necessario
  }


  public submit(): void {
    if (!this.isAuthorized) {
      alert('Non sei autorizzato a procedere.');
      return;
    }
    this.close();
      this.readOnly = this.readOnly? true : false;
      this.additionalInfoService.addAdditionalInfo({
        key: this.key, label: this.label, scopeKey: this.scopeKey,
        scopeLabel: this.scopeLabel, type: this.type, readOnly: this.readOnly,
        script: this.script, regex: this.regex
      }).then(() => {
        console.log("Aggiunta correttamente");
        location.reload();
      }).catch((error) => {
        console.error(error);
      });
  }

  resetPasswordVisibility(e: MouseEvent) {
    this.passwordVisibility = false;
  }
  togglePasswordVisibility(e:MouseEvent) {
    this.passwordVisibility = true;
  }


}
