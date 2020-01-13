import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IArticleHeader} from '../_interfaces/iarticle-header';
import {IArticleRendererBlock} from '../_interfaces/iarticle-renderer-block';
import {IBlockConfig} from '../_interfaces/iblock-config';

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
