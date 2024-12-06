import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DefaultUrlSerializer, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { AppConfigService } from '@lgccommon/lib/services/app-config.service';
import { Observable } from 'rxjs';
import { AuthBaseGuard } from './auth-base.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends AuthBaseGuard {

  constructor(public router: Router, public authService: AuthService, public appConfigService: AppConfigService) {
    super(router, authService, appConfigService);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().then((isAuthenticated) => {
      let redirectUrl = "";

      const urlSegments = state.url;
      const urlTree = new DefaultUrlSerializer().parse(urlSegments);
      const lastSegment = urlTree.root.children['primary'].segments[urlTree.root.children['primary'].segments.length - 1];
      if (lastSegment && lastSegment.path === 'licenceMgr') {
        redirectUrl = '/licenceMgr/home';
      }
      if (isAuthenticated) {
        return redirectUrl != "" ? this.router.createUrlTree([redirectUrl]) : true;
      } else {
        return this.router.createUrlTree(['/login'], {
          queryParams: { ReturnUrl: redirectUrl != "" ? redirectUrl : state.url },
        });
      }
    });
  }
}
