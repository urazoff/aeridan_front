import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from '../localization/language.service';
import {Title} from '@angular/platform-browser';
import {TitleGeneratorService} from '../title-generator/title-generator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.dark.component.less', './login-page.light.component.less']
})
export class LoginPageComponent implements OnInit {
  switch: FormGroup;
  signUp: FormGroup;
  signIn: FormGroup;

  constructor(public lang: LanguageService, title: TitleGeneratorService) {
    this.switch = new FormGroup({
      authtype: new FormControl('login')
    });
    const loginValidator = Validators.pattern('[^\\s]{2,} [^\\s]{2,}');
    const passwordValidator = Validators.pattern(
      '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    this.signUp = new FormGroup({
      login: new FormControl('', [Validators.required, loginValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      'password-preview': new FormControl(false)
    });
    this.signIn = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      remember: new FormControl(),
      'password-preview': new FormControl(false)
    });

    title.setTitle('TITLE_LOGIN_PAGE');
  }

  ngOnInit() {
  }

}
