import {Component, Input, OnInit} from '@angular/core';
import {IArticleLatex} from '../interfaces/iarticle-latex';

@Component({
  selector: 'app-latex',
  templateUrl: './latex.component.html',
  styleUrls: ['./latex.component.less']
})
export class LatexComponent implements OnInit {
  @Input() data: IArticleLatex;
  constructor() { }

  ngOnInit() {
  }

}
