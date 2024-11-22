import { Component } from '@angular/core';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.scss']
})
export class ProvaComponent {

  usernameList: { [key: string]: string } = {
    "Antonio": "admin",
    "Luca": "admin",
    "Vincenzo": "admin"
  };

  Username: string = "Antonio";

  Password: string = "admin";


  onSaveData() {
    if(this.Username in this.usernameList){
      if(this.Password == this.usernameList[this.Username])
        console.log("il bro c'è");

    }
    else
      console.log("il bro non ce");
    // controllo che esista lutente
  }

}
