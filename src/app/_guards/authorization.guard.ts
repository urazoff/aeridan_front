import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {NavigatorService} from '../_services/navigator.service';
import {LanguageService} from '../localization/language.service';
import {AuthorizationService} from '../_requests/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private nav: NavigatorService, public lang: LanguageService, public auth: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getUser().then((response) => {
      if (response !== null && Object.keys(response).length > 0) {
        return true;
      }
      this.nav.to(this.lang, '/login', {queryParams: {redirectUrl: state.url}});
      return false;
    });
  }

}
