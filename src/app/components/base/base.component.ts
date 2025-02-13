import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugService } from '@app/services/debug/debug.service';
import { CommonDialogService } from '@lgccommon/lib/blocks/commondialog/commondialog.service';
import { CommonDialogDirective } from '@lgccommon/lib/blocks/commondialog/commondialog.directive';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  // Injections
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  public debugService = inject(DebugService);
  public commonDialogService = inject(CommonDialogService);
  @ViewChild(CommonDialogDirective, { static: true }) CommonDialog!: CommonDialogDirective;

  protected isLoading: boolean = false;
}
