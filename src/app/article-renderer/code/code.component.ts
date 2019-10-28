import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IArticleHeader} from '../interfaces/iarticle-header';
import {IArticleCode} from '../interfaces/iarticle-code';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.less']
})
export class CodeComponent implements OnInit, AfterViewInit {
  @Input() data: IArticleCode;
  @ViewChild('code', {static: false}) code: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    if (this.data.language === 'auto') {
      this.data.language = '';
    }
    hljs.highlightBlock(this.code.nativeElement);
  }

}
