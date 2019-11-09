import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-delimiter',
  templateUrl: './delimiter.component.html',
  styleUrls: ['./delimiter.component.less']
})
export class DelimiterComponent implements OnInit {
  @Input() data: object;
  constructor() { }

  ngOnInit() {
  }

}
