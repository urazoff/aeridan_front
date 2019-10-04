import {Component, Input, OnInit} from '@angular/core';
import {IArticleList} from '../../interfaces/iarticle-list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() data: IArticleList;
  constructor() { }
  ngOnInit() {
  }

}
