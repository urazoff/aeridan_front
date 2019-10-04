import {Component, OnInit} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import {ArticleDataService} from '../article-data.service';
import {IArticleLayout, IArticle} from '../interfaces/IArticle';
import {IArticleRequest} from '../interfaces/IArticleRequest';
import {Router} from '@angular/router';
import {HeaderT} from './plugin-extension';
import {IHeaderTag} from "./interfaces/iheader-tag";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [ArticleDataService]
})
export class EditorComponent implements OnInit {
  editor: EditorJS;

  constructor(private httpService: ArticleDataService, private router: Router) {
  }

  error = '';
  title: string;

  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'article-editor',
      placeholder: 'Let`s write an awesome story!',
      tools: {
        heading: {
          class: Header,
          config: {
            placeholder: 'Enter header',
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
      (el as HTMLElement).style.minHeight = String(
        Number((el as HTMLElement).style.fontSize) * Number((el as HTMLElement).style.lineHeight));
    });
  }

  /**
   * Сохраняет статью, добавляет к ней заголовок и отправляет на сервер.
   * В случае ошибки - сохраняет текст ошибки в `this.error`, выводит объект ошибки в консоль.
   * @param title Заголовок статьи.
   */
  onTitleChanged(title: string) {
    this.title = title;
  }
  publicate(title = this.title) {
    this.error = '';
    this.editor.save().then((article) => {
      return new Promise((resolve, reject) => {
        // this.editor.render(article).then(result => console.log('Rendered', result));
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
        console.log(articleRequest);
        this.httpService.send(articleRequest)
          .subscribe(
            (data: IArticle) => {
              resolve(data);
            },
            error => {
              reject(error);
            }
          );
      });
    }).then((data: IArticle) => {
      this.router.navigate(
        ['/article', data.id],
      );
    }).catch((error: Error) => {
      console.log('Saving failed', error);
      this.error = error.message;
    });
    // console.log(this.error)
  }

  preview() {

  }
}
