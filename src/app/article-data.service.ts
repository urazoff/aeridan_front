import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  constructor(private http: HttpClient) { }
  /**
   * Отправляет POST-запрос на сервер с объектом статьи.
   * @param articleObject Объект статьи. Содержит блоки и заголовок.
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  send(articleObject: object) {
    return this.http.post('https://dilshod.xyz/api/v1/article', articleObject);
  }
  get(id: number) {
    return this.http.get(`https://dilshod.xyz/api/v1/article/${id}`);
  }
}
