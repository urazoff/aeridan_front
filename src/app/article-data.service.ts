import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }   from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  constructor(private http: HttpClient) { }

  send(articleObject: Object) {
    articleObject["type"]="article";
    return this.http.post("test", articleObject);
  }
}
