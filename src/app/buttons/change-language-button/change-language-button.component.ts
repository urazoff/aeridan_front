import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../../localization/language.service';
import {Router} from '@angular/router';
import {NavigatorService} from '../../_services/navigator.service';
import {ThemeService} from '../../_services/theme.service';

@Component({
  selector: 'app-change-language-button',
  templateUrl: './change-language-button.component.html',
  styleUrls: ['./change-language-button.component.less']
})
export class ChangeLanguageButtonComponent implements OnInit {

  constructor(private lang: LanguageService, private router: Router, private nav: NavigatorService, public theme: ThemeService) { }

  ngOnInit() {
  }

  changeLanguage() {
    if (this.lang.getUserLang() === 'ru') {
      this.lang.setUserLang('en');
    } else {
      this.lang.setUserLang('ru');
    }
    this.nav.toHref(this.router.url.substring(3));
  }

}
