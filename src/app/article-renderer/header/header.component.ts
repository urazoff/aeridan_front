import {Component, Input, OnInit} from '@angular/core';
import {IArticleHeader} from '../../interfaces/iarticle-header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() data: IArticleHeader;
  constructor() { }

  ngOnInit() {
  }

}
