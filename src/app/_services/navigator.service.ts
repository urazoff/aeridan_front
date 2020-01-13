import {Injectable} from '@angular/core';
import {LanguageService} from '../localization/language.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(public router: Router) {
  }

  to(lang: LanguageService, url, navExtras: object = {}) {
    this.router.navigate(
      [`/${lang.getUserLang()}${url}`],
      navExtras
    );
  }
  toHref(url: string) {
    this.router.navigate([url]);
  }
}
