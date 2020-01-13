import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef,
  AfterContentInit, AfterViewInit, ViewContainerRef, QueryList, ReflectiveInjector, AfterContentChecked, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import {IArticle} from '../_interfaces/IArticle';
import {HeaderComponent} from './header/header.component';
import {ImageComponent} from './image/image.component';
import {ListComponent} from './list/list.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {QuoteComponent} from './quote/quote.component';
import {TableComponent} from './table/table.component';
import {LinkComponent} from './link/link.component';
import {EmbedComponent} from './embed/embed.component';

@Component({
  selector: 'app-article-renderer',
  templateUrl: './article-renderer.component.html',
  styleUrls: ['./article-renderer.component.less']
})
export class ArticleRendererComponent implements OnInit {

  @Input() article: IArticle;
  @ViewChild('articleContent', {static: false, read: ViewContainerRef}) articleContent: ViewContainerRef;
  componentToTypeDict: object = {
    heading: HeaderComponent,
    image: ImageComponent,
    list: ListComponent,
    paragraph: ParagraphComponent,
    quote: QuoteComponent,
    table: TableComponent,
    link: LinkComponent,
    embed: EmbedComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver,) {
  }

  ngOnInit(): void {
  }

}
