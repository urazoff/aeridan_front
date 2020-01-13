import {Component, Input, OnInit} from '@angular/core';
import {IArticleKatex} from '../_interfaces/iarticle-katex';

@Component({
  selector: 'app-latex',
  templateUrl: './katex.component.html',
  styleUrls: ['./katex.component.less']
})
export class KatexComponent implements OnInit {
  @Input() data: IArticleKatex;
  constructor() { }

  ngOnInit() {
  }

}
