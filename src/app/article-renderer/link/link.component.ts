import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {
  @Input() data: object;
  constructor() { }

  ngOnInit() {
  }

}
