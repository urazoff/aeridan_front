import { Injectable } from '@angular/core';
import {LanguageService} from '../localization/language.service';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleGeneratorService {

  constructor(public lang: LanguageService, public title: Title) { }
  public setTitle(...titles) {
    titles.unshift('TITLE_PROJECT')
    const fullTitle = titles.filter(x => x.length !== 0).map(x => this.lang.translate(x)).join(' — ');
    this.title.setTitle(fullTitle);
  }
}
