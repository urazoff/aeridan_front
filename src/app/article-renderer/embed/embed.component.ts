import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import SERVICES from '../../editor/plugins/embed/src/services';
import {IArticleEmbed} from '../interfaces/iarticle-embed';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.less']
})
export class EmbedComponent implements OnInit, AfterViewInit {
  @Input() data: IArticleEmbed;
  @ViewChild('dataContainer', {static: false}) dataContainer: ElementRef;
  services: object = SERVICES;
  html: string;
  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    const start = String.raw`${this.services[this.data.service].html.slice(0, 7)}`;
    const end = String.raw`${this.services[this.data.service].html.slice(7)}`;
    this.html = String.raw`${start + ` src=\"${this.data.embed}\"` + end}`;
    this.dataContainer.nativeElement.innerHTML = this.html;
  }


}
