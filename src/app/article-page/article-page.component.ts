import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {IArticle} from '../interfaces/IArticle';
import {ArticleDataService} from '../article-data.service';
import {LanguageService} from '../localization/language.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {
  id: number;
  language: string;
  data: IArticle;
  isArticleReceived: boolean = false;
  private subscription: Subscription;

  // @ViewChild('articleContainer') articleContainer: TemplateRef;
  constructor(private activatedRoute: ActivatedRoute, private articleDataService: ArticleDataService, private router: Router,
              public lang: LanguageService) {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.articleDataService.getArticle(this.id).then((data: IArticle) => {
        this.data = data;
        this.isArticleReceived = true;
      }).catch((error) => {
        this.router.navigate(
          ['/notfound'],
        );
      });
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

  navigateToEdit() {
    this.router.navigate(
      [`/${this.language}/edit/${this.id}`],
    );
  }

}
