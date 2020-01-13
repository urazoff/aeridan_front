import {Component, Input, OnInit} from '@angular/core';
import {IArticleLink} from '../_interfaces/iarticle-link';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {
  @Input() data: IArticleLink;
  hostname: string;
  constructor() { }

  ngOnInit() {
    try {
      this.hostname = (new URL(this.data.link)).hostname;
    } catch (e) {
      this.hostname = this.data.link;
    }
  }

}
