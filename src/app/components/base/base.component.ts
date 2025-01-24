import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugService } from '@app/services/debug/debug.service';

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

  protected isLoading: boolean = false;
}
