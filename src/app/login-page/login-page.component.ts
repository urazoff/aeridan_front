import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from '../localization/language.service';
import {Title} from '@angular/platform-browser';
import {TitleGeneratorService} from '../title-generator/title-generator.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../_requests/authorization.service';
import {NavigatorService} from '../_services/navigator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.dark.component.less', './login-page.light.component.less']
})
export class LoginPageComponent implements OnInit {
  switch: FormGroup;
  signUp: FormGroup;
  signIn: FormGroup;
  private querySubscription: Subscription;
  redirectUrl: string;

  constructor(public lang: LanguageService, title: TitleGeneratorService, private route: ActivatedRoute, public auth: AuthorizationService,
              public nav: NavigatorService) {
    this.switch = new FormGroup({
      authtype: new FormControl('login')
    });
    const loginValidator = Validators.pattern('[^\\s]{2,} [^\\s]{2,}');
    const passwordValidator = Validators.pattern(
      '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    const emailValidator =  Validators.pattern('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$');
    this.signUp = new FormGroup({
      login: new FormControl('', [Validators.required, loginValidator]),
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      'password-preview': new FormControl(false)
    });
    this.signIn = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      remember: new FormControl(false),
      'password-preview': new FormControl(false)
    });

    title.setTitle('TITLE_LOGIN_PAGE');

    this.querySubscription = route.queryParams.subscribe(
      (queryParam) => {
        if (queryParam.redirectUrl) {
          this.redirectUrl = queryParam.redirectUrl;
        } else {
          this.redirectUrl = '/';
        }
      }
    );
  }

  login() {
    if (this.signIn.valid) {
      this.auth.login(this.signIn.get('email').value, this.signIn.get('password').value, this.signIn.get('remember').value);
      this.nav.toHref(this.redirectUrl);
    }
  }

  register() {
    if (this.signUp.valid) {
      this.auth.register(this.signUp.get('email').value, this.signUp.get('login').value, this.signUp.get('password').value);
      this.nav.toHref(this.redirectUrl);
    }
  }

  openAuthWindow(url: string, windowName: string) {
    const authWindow = window.open(url, windowName);
    console.log(authWindow.location);
    authWindow.addEventListener('load', (event) => {
      console.log(authWindow.location);
    });
  }

  ngOnInit() {
  }

}
