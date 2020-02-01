import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ru from './langs/ru';
import en from './langs/en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  availableLangs: Array<string>;
  dictionary: object;
  defaultLang = 'en';

  constructor(private http: HttpClient) {
    this.availableLangs = ['ru', 'en'];
    this.dictionary = this.getDictionary(this.defaultLang);
  }

  get languages() {
    return {
      ru,
      en
    };
  }

  getDictionary(lang: string) {
    return this.languages[lang];
  }

  public getUserLang(): string {
    if (!localStorage.getItem('language')) {
      for (const lang of navigator.languages) {
        if (this.availableLangs.indexOf(lang) !== -1) {
          return lang;
        }
      }
      return this.defaultLang;
    } else {
      return localStorage.getItem('language');
    }
  }

  public setUserLang(lang) {
    if (this.availableLangs.indexOf(lang) !== -1) {
      localStorage.setItem('language', lang);
    } else {
      localStorage.setItem('language', this.defaultLang);
    }
    this.dictionary = this.getDictionary(this.getUserLang());
  }

  translate(word: string, ...additional: Array<string>) {
    let dictionary = this.dictionary;
    let result = '';
    if (!dictionary) {
      dictionary = this.getDictionary(this.getUserLang());
    }
    if (dictionary[word]) {
      result = dictionary[word];
    } else if (this.getDictionary(this.defaultLang)[word]) {
      result = this.getDictionary(this.defaultLang)[word];
    } else {
      result = word;
    }
    if (additional.length > 0) {
      // tslint:disable-next-line:radix
      result = result.replace(/%%(\d+)%%/gm, (match, p1) => additional[Number.parseInt(p1)]);
    }
    return result;
  }
}
