import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import { ArticleDataService } from '../article-data.service';
import { IArticleLayout, IArticle } from '../interfaces/IArticle';
import { IArticleRequest } from '../interfaces/IArticleRequest';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [ArticleDataService]
})
export class EditorComponent implements OnInit {
  editor: EditorJS;
  constructor(private httpService: ArticleDataService) { }
  error = '';
  title: string;

  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'article-editor',
      placeholder: 'Let`s write an awesome story!',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header',
            tags: ['H2', 'H3', 'H4']
          }
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        table: Table,
        image: Image,
        link: Link,
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            }
          }
        },
        quote: Quote,
      }
    });
    // this.fixFirefoxHeightIssue("article-editor");
  }

  fixFirefoxHeightIssue(element) {
    const parent = document.querySelector('#' + element);
    const contenteditableElements = parent.querySelectorAll('[contenteditable="true"]');
    contenteditableElements.forEach(el => {
      ( el as HTMLElement).style.minHeight = String(
        Number(( el as HTMLElement).style.fontSize) * Number(( el as HTMLElement).style.lineHeight));
    });
  }

  /**
   * Сохраняет статью, добавляет к ней заголовок и отправляет на сервер.
   * В случае ошибки - сохраняет текст ошибки в `this.error`, выводит объект ошибки в консоль.
   * @param title Заголовок статьи.
   */
  publicate(title = this.title) {
    this.error = '';
    this.editor.save().then((article) => {
      return new Promise( (resolve, reject) => {
      const articleLayout: IArticleLayout = {
        title,
        time: article.time,
        blocks: article.blocks,
        version: article.version
      };
      const articleRequest: IArticleRequest = {
        layout: articleLayout,
        owner: 1
      };
      this.httpService.send(articleRequest)
        .subscribe(
          (data: IArticle) => { resolve(data); },
          error => { reject(error); }
        );
    });
  }).catch((error: Error) => {
      console.log('Saving failed', error);
      this.error = error.message;
    });
    // console.log(this.error)
  }
}
