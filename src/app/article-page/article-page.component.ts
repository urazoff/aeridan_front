import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {
  id: number;
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
    this.subscription = this.activatedRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {

  }

}
