import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-callback-page',
  templateUrl: './login-callback-page.component.html',
  styleUrls: ['./login-callback-page.component.less']
})
export class LoginCallbackPageComponent implements OnInit {
  private querySubscription: Subscription;
  private message: string;
  constructor(private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.message = queryParam['message'];
        if (this.message && typeof this.message === 'string' && window.opener) {
          window.opener.postMessage(this.message, 'https://dilshod.xyz');
        }
        window.close();
      }
    );
  }

  ngOnInit() {
  }

}
