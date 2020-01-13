import {Component, Input, OnInit} from '@angular/core';
import {IArticleTable} from '../_interfaces/iarticle-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  @Input() data: IArticleTable;
  constructor() { }

  ngOnInit() {
  }

}
