import {Component, Input, OnInit} from '@angular/core';
import {IArticleImage} from '../interfaces/iarticle-image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {
  @Input() data: IArticleImage;
  constructor() { }

  ngOnInit() {
  }

}
