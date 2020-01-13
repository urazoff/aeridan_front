import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IArticle} from '../_interfaces/IArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  constructor(private http: HttpClient) { }
  /**
   * Отправляет POST-запрос на сервер с объектом статьи.
   * @param data Объект статьи. Содержит блоки и заголовок.
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  send(data: object) {
    return this.http.post('https://dilshod.xyz/api/v1/article', data);
  }

  /**
   * Отправляет GET-запрос на сервер с id статьи.
   * @param id id статьи.
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  get(id: string) {
    return this.http.get(`https://dilshod.xyz/api/v1/article/get/${id}`);
  }

  /**
   * Отправляет PATCH запрос на сервер с id и объектом статьи.
   * @param id id статьи.
   * @param data Объект статьи.
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  update(id: string, data: object) {
    return this.http.patch(`https://dilshod.xyz/api/v1/article/update/${id}`, data);
  }

  /**
   * Получает статью  с сервера.
   * @param id id статьи.
   * @returns `Promise` объект, возвращающий либо `IArticle` объект статьи, либо ошибку.
   */
  getArticle(id: string) {
    return new Promise((resolve, reject) => {
      this.get(id)
        .subscribe(
          (data: IArticle) => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
