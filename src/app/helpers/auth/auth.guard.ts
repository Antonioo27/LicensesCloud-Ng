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
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this.authService.isAuthenticated().then((res) => {
        var navigateToLogin = false;
        var UserName: string = state.root.queryParams['UserName'];
        // var PassWord: string = state.root.queryParams['PassWord'];
        if (res) {
          if (UserName && res.Pr_UserName !== UserName) {
            navigateToLogin = true;
          }
        } else {
          navigateToLogin = true;
        }
        if (navigateToLogin) {
          this.router.navigate(['/pages/login'], {
            queryParams: { ReturnUrl: state.url },
            replaceUrl: true,
          });
        }
        // Se esistono i parametri UserName e PassWord ricevuti via url, li devo eliminare per evitare
        // problemi con le rotte di Angular
        var ReturnUrl = new DefaultUrlSerializer().parse(state.url);
        if (ReturnUrl.queryParams['UserName'] && ReturnUrl.queryParams['PassWord']) {
          delete ReturnUrl.queryParams['UserName'];
          delete ReturnUrl.queryParams['PassWord'];
          resolve(ReturnUrl);
        } else {
          resolve(true);
        }
      });
    });
  }
}
