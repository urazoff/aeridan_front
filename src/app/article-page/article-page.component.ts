import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {IArticle} from '../interfaces/IArticle';
import {ArticleDataService} from '../article-data.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {
  id: number;
  data: IArticle;
  isArticleReceived: boolean = false;
  private subscription: Subscription;
  // @ViewChild('articleContainer') articleContainer: TemplateRef;
  constructor(private activatedRoute: ActivatedRoute, private articleDataService: ArticleDataService, private router: Router) {
    const idProm = new Promise((resolve, reject) => {
      this.subscription = this.activatedRoute.params.subscribe(params => {
        this.id = params.id;
        resolve(params.id);
      });
    });
    idProm.then((id: number) => {
      return this.articleDataService.getArticle(id).then((data: IArticle) => {
        this.data = data;
        this.isArticleReceived = true;
      }).catch((error) => {
        this.router.navigate(
          ['/notfound'],
        );
      });
    });
    // this.querySubscription = this.activatedRoute.queryParams.subscribe(
    //   (queryParam: any) => {
    //     this.data = queryParam.data;
    //   }
    // );
  }
  ngOnInit() {
  }
  navigateToEdit() {
    this.router.navigate(
      ['/edit' + `/${this.id}`],
    );
  }

}
