import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IArticleHeader} from '../interfaces/iarticle-header';
import {IArticleRendererBlock} from '../interfaces/iarticle-renderer-block';
import {IBlockConfig} from '../interfaces/iblock-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() data: IArticleHeader;
  constructor() {
  }

  ngOnInit() {
    console.log(this.data);
  }
  ngAfterViewInit() {
  }

}
