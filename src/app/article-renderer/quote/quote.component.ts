import {Component, Input, OnInit} from '@angular/core';
import {IArticleQuote} from '../interfaces/iarticle-quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.less']
})
export class QuoteComponent implements OnInit {
  @Input() data: IArticleQuote;
  constructor() { }

  ngOnInit() {
  }

}
