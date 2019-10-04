import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private subscription: Subscription;
  private querySubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private httpService: ArticleDataService) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      try {
        this.id = params.id;
        this.getArticle(this.id);
      } catch (e) {
        console.log(e);
      }
    });
    // this.querySubscription = this.activatedRoute.queryParams.subscribe(
    //   (queryParam: any) => {
    //     this.data = queryParam.data;
    //   }
    // );
  }
  getArticle(id: number) {
      this.httpService.get(this.id)
        .subscribe(
          (data: IArticle) => {
            this.data = data;
          },
          error => {
            console.log(error);
          }
        );
  }
  ngOnInit() {
  }

}
