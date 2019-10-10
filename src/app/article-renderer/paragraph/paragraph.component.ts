import {Component, Input, OnInit} from '@angular/core';
import {IArticleParagraph} from '../interfaces/iarticle-paragraph';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.less']
})
export class ParagraphComponent implements OnInit {
  @Input() data: IArticleParagraph;
  constructor() { }

  ngOnInit() {
  }

}
