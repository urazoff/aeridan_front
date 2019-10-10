import {Component, Input, OnInit} from '@angular/core';
import {IArticleHeader} from '../interfaces/iarticle-header';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.less']
})
export class EmbedComponent implements OnInit {
  @Input() data: object;
  constructor() { }

  ngOnInit() {
  }

}
