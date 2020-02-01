import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../localization/language.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ThemeService} from '../_services/theme.service';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.less']
})
export class PageContainerComponent implements OnInit {
  public language: string;
  private subscription: Subscription;

  constructor(public lang: LanguageService, private activatedRoute: ActivatedRoute, private router: Router,
              public theme: ThemeService) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.language = params.language;
      if (!this.language) {
        this.router.navigate(
          [`/${lang.getUserLang()}${this.router.url}`],
        );
      } else {
        this.lang.setUserLang(this.language);
      }
    });
  }

  ngOnInit() {
  }

}
