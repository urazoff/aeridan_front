import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IArticleHeader} from '../_interfaces/iarticle-header';
import {IArticleCode} from '../_interfaces/iarticle-code';
import hljs from 'highlight.js';
import {LanguageService} from '../../localization/language.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.less']
})
export class CodeComponent implements OnInit, AfterViewInit {
  @Input() data: IArticleCode;
  @ViewChild('code', {static: false}) code: ElementRef;
  @ViewChild('language', {static: false}) language: ElementRef;
  maxHeight: number = 200;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    if (this.data.language === 'auto') {
      // this.data.language = '';
      this.language.nativeElement.textContent = '';
      this.code.nativeElement.className = '';
    }
    hljs.highlightBlock(this.code.nativeElement);
    this.language.nativeElement.textContent = this.code.nativeElement.classList[1];
    this.cd.detectChanges();
  }

}
