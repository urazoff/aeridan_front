import {Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ElementRef} from '@angular/core';
import { IArticle } from '../interfaces/IArticle';
import {HeaderComponent} from './header/header.component';
import {ImageComponent} from './image/image.component';

@Component({
  selector: 'app-article-renderer',
  templateUrl: './article-renderer.component.html',
  styleUrls: ['./article-renderer.component.less']
})
export class ArticleRendererComponent implements OnInit {

  @Input() article: IArticle;
  @ViewChild('articleContent', {static: false}) articleContent;
  componentToTypeDict: object = {
    header: HeaderComponent,
    image: ImageComponent
  };
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnInit(): void {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit() {
    for (const block of this.article.layout.blocks) {
      this.findAndCreateComponent(block.type, block.data);
    }
  }

  findAndCreateComponent(type: string, data: any) {
    if (this.componentToTypeDict[type]) {
      const articleComponent = this.componentFactoryResolver.resolveComponentFactory(this.componentToTypeDict[type]);
      const articleComponentRef = this.articleContent.viewContainerRef.createComponent(articleComponent);

      (articleComponentRef.instance).data = data;
    }
  }


}
