import { Component, Output } from '@angular/core';
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
import { BaseComponent } from '@app/components/base/base.component';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent{

  public selected = "Inbox";
  public menuSvg: SVGIcon = menuIcon;

  constructor() {
    super()
  }

  public items: Array<DrawerItem> = [
    { text: "Clienti", svgIcon: accessibilityIcon, selected: true },
    { separator: true },
    { text: "Informazioni aggiuntive cliente", svgIcon: envelopeLinkIcon },
  ];

  ngOnInit(): void {
    const currentUrl = this.router.url;
    if (currentUrl === '/admin/home') {
      this.items.forEach(item => {
        if (item.text === 'Clienti') {
          item.selected = true;
          this.selected = item.text;
        } else {
          item.selected = false;
        }
      });
    } else if (currentUrl === '/admin/additionalInfo') {
      this.items.forEach(item => {
        if (item.text === 'Informazioni aggiuntive cliente') {
          item.selected = true;
          this.selected = item.text;
        } else {
          item.selected = false;
        }
      });
    }
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    const currentUrl = this.router.url;
    if (ev.item.text === "Clienti") {
      this.router.navigate(['admin/home']);
    } else if (ev.item.text === "Informazioni aggiuntive cliente") {
      this.router.navigate(['admin/additionalInfo']);
    }
  }




}

