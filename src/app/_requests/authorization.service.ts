import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IArticle} from '../_interfaces/IArticle';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private http: HttpClient) {
  }

  register(email: string, fullName: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('https://dilshod.xyz/api/v1/register', {email, fullName, password})
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string, remember: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('https://dilshod.xyz/api/v1/login', {email, password, remember})
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.get('https://dilshod.xyz/api/v1/logout')
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.http.get('https://dilshod.xyz/api/v1/user/info')
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
