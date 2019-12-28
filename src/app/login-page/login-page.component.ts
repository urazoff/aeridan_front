import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.dark.component.less', './login-page.light.component.less']
})
export class LoginPageComponent implements OnInit {
  switch: FormGroup;

  constructor() {
    this.switch = new FormGroup({
      authtype: new FormControl('login')
      });
  }

  ngOnInit() {
  }

}
