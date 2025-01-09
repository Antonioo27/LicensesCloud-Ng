import { LoginService } from '@app/services/login/login.service';
import { Component } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import {
  SVGIcon,
  qrCodeIcon,
  calendarIcon,
  envelopeLinkIcon,
  accessibilityIcon,
  menuIcon,
  starOutlineIcon,
} from "@progress/kendo-svg-icons";

import {
  WindowService,
  WindowRef,
  WindowCloseResult,
} from "@progress/kendo-angular-dialog";



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public selected = "Inbox";
  public menuSvg: SVGIcon = menuIcon;

  constructor(private loginService: LoginService) {}

  public items: Array<DrawerItem> = [
    { text: "Customers", svgIcon: accessibilityIcon, selected: true },
    { separator: true },
    { text: "Licenza", svgIcon: qrCodeIcon },
    { text: "Calendar", svgIcon: calendarIcon },
    { separator: true },
    { text: "Attachments", svgIcon: envelopeLinkIcon },
    { text: "Favourites", svgIcon: starOutlineIcon },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }

  password: string = "";
  username: string = "";

  public opened = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    this.close();
    if(this.username.trim().length > 0 && this.password.trim().length > 0) {
      this.loginService.Register({ Username: this.username, Password: this.password }).then(() => {
        location.reload();
      }).catch((error) => {
        console.error(error);
      });
    } else {
      alert("Inserire username e password");
    }
  }
}

