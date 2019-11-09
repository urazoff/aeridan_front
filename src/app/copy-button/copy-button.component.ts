import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../localization/language.service';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.less']
})
export class CopyButtonComponent implements OnInit {
  @Input() textToCopy: string;
  constructor(private lang: LanguageService) { }

  ngOnInit() {
  }
  onClick(event) {
    navigator.clipboard.writeText(this.textToCopy);
  }

}
