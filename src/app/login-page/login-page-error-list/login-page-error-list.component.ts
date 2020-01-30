import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../localization/language.service';

@Component({
  selector: 'app-login-page-error-list',
  templateUrl: './login-page-error-list.component.html',
  styleUrls: ['./login-page-error-list.component.less']
})
export class LoginPageErrorListComponent implements OnInit {
  @Input() errors: Array<string> = [];

  constructor(public lang: LanguageService) {
    this.errors = this.errors.filter((value) => value.length > 0);
  }

  ngOnInit() {
  }

}
