import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../interfaces/IArticle';

@Component({
  selector: 'app-article-renderer',
  templateUrl: './article-renderer.component.html',
  styleUrls: ['./article-renderer.component.less']
})
export class ArticleRendererComponent implements OnInit {
  @Input() article: IArticle;
  constructor() { }

  ngOnInit() {
    
  }

}
