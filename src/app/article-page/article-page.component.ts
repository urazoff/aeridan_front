import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {IArticle} from '../_interfaces/IArticle';
import {ArticleDataService} from '../_requests/article-data.service';
import {LanguageService} from '../localization/language.service';
import {TitleGeneratorService} from '../title-generator/title-generator.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {
  id: string;
  language: string;
  data: IArticle;
  isArticleReceived: boolean = false;
  private subscription: Subscription;

  // @ViewChild('articleContainer') articleContainer: TemplateRef;
  constructor(private activatedRoute: ActivatedRoute, private articleDataService: ArticleDataService, private router: Router,
              public lang: LanguageService, public title: TitleGeneratorService) {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.articleDataService.getArticle(this.id).then((data: IArticle) => {
        this.data = data;
        this.isArticleReceived = true;
        this.title.setTitle('TITLE_ARTICLE_PAGE', data.layout.title);
      }).catch((error) => {
        this.router.navigate(
          ['/notfound'],
        );
      });
    });
  }

  ngOnInit() {
  }

  navigateToEdit() {
    this.router.navigate(
      [`/${this.lang.userLang}/edit/${this.id}`],
    );
  }

}
