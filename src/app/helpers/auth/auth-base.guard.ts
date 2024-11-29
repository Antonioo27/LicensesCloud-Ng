import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { AppConfigService } from '@lgccommon/lib/services/app-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthBaseGuard {

  constructor(public router: Router, public authService: AuthService, public appConfigService: AppConfigService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
