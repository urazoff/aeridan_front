import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IArticle} from '../_interfaces/IArticle';
import {ArticleDataService} from '../_requests/article-data.service';
import {LanguageService} from '../localization/language.service';
import {TitleGeneratorService} from '../title-generator/title-generator.service';
import {AccessSecurityService} from '../_services/access-security.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.less']
})
export class EditorPageComponent implements OnInit {
  id?: string = null;
  language?: string;
  data: IArticle = null;
  isArticleReceived = false;
  private subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private articleDataService: ArticleDataService, public lang: LanguageService,
              private router: Router, public title: TitleGeneratorService, private accessSecurity: AccessSecurityService) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.articleDataService.getArticle(this.id).then((data: IArticle) => {
          this.data = data;
          this.accessSecurity.canEdit(data.owner.id);
          this.isArticleReceived = true;
          this.title.setTitle('TITLE_EDIT_ARTICLE_PAGE', data.layout.title);
        });
      } else {
        this.title.setTitle('TITLE_CREATE_ARTICLE_PAGE');
      }
    });
  }

  ngOnInit() {
  }

}
