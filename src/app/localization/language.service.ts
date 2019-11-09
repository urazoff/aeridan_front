import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ru from './langs/ru';
import en from './langs/en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  userLang: any;
  availableLangs: Array<string>;
  dictionary: object;
  defaultLang = 'en';

  constructor(private http: HttpClient) {
    this.availableLangs = ['ru', 'en'];
    this.userLang = this.defaultLang;
    for (const lang of navigator.languages) {
      if (this.availableLangs.indexOf(lang) !== -1) {
        this.userLang = lang;
        break;
      }
    }
    this.dictionary = this.getDictionary(this.userLang);
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

  translate(word: string) {
    if (this.dictionary[word]) {
      return this.dictionary[word];
    } else {
      return this.getDictionary(this.defaultLang)[word];
    }
  }
}
