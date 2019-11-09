import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {LanguageService} from '../localization/language.service';

@Component({
  selector: 'app-spoiler-button',
  templateUrl: './spoiler-button.component.html',
  styleUrls: ['./spoiler-button.component.less']
})
export class SpoilerButtonComponent implements OnInit {
  @Input() block: HTMLDivElement;
  @Input() maxHeight: number;
  labels: Array<string>;
  isShow = false;
  defaultStyleDisplay: string;
  constructor(private lang: LanguageService) {
    this.labels = [this.lang.translate('SPOILER_BUTTON_HIDE'), this.lang.translate('SPOILER_BUTTON_SHOW')];
  }

  ngOnInit() {
    // this.isShow = this.height <= this.maxHeight;
    this.defaultStyleDisplay = this.block.style.display;
    this.limitHeight(this.block);
  }
  onClick(event) {
    this.isShow = !this.isShow;
    this.limitHeight(this.block);
  }
  hideShowBlock(block: HTMLDivElement) {
    if (!this.isShow) {
      block.style.display = 'None';
    } else {
      block.style.display = this.defaultStyleDisplay;
    }
  }
  limitHeight(block: HTMLElement) {
    if (!this.isShow) {
      block.style.maxHeight = this.maxHeight + 'px';
      block.style.overflowY = 'auto';
    } else {
      block.style.maxHeight = 'none';
      block.style.overflowY = 'none';
    }
  }
}
