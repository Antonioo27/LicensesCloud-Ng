import {Component, inject} from '@angular/core';
import { LoginService } from '@app/services/login/login.service';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.scss']
})
export class ProvaComponent {
logServ:any=inject(LoginService);
user:string="";
password:string="";
conf_all="";

confronta(){
  if(this.user==this.logServ.getUser() && this.password==this.logServ.getPassword()){
    this.conf_all="APPROVATO"
  }else{this.conf_all="NON APPROVATO"}

}
}



