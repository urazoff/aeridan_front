import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IArticle} from '../interfaces/IArticle';
import {ArticleDataService} from '../article-data.service';
import {LanguageService} from '../localization/language.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.less']
})
export class EditorPageComponent implements OnInit {
  id?: number = null;
  language?: string;
  data: IArticle = null;
  isArticleReceived = false;
  private subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private articleDataService: ArticleDataService, public lang: LanguageService,
              private router: Router) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.articleDataService.getArticle(this.id).then((result: IArticle) => {
          this.data = result;
          this.isArticleReceived = true;
        });
      }
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
