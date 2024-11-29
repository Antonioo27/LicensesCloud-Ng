import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  // Injections
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);


  protected isLoading: boolean = false;
}
