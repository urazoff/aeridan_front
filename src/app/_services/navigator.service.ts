import {Injectable} from '@angular/core';
import {LanguageService} from '../localization/language.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(public router: Router, private lang: LanguageService) {
  }

  to(url, navExtras: object = {}) {
    this.router.navigate(
      [`/${this.lang.userLang}${url}`],
      navExtras
    );
  }
  toHref(url: string) {
    this.router.navigate([url]);
  }
}
