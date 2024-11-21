import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;

  constructor() {}

  ngOnInit() {}
}
