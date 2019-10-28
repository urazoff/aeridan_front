import {Component, Input, OnInit} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from './plugins/header';
import Image from '@editorjs/image';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Latex from './plugins/latex';
import Code from './plugins/code';
import {ArticleDataService} from '../article-data.service';
import {IArticleLayout, IArticle} from '../interfaces/IArticle';
import {IArticleRequest} from '../interfaces/IArticleRequest';
import {Router} from '@angular/router';
import {EmptyArticleBlocksError, EmptyTitleError} from '../errors/ArticleSaveErrors';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [ArticleDataService]
})
export class EditorComponent implements OnInit {
  editor: EditorJS;

  @Input() data?: IArticle = null;
  config: object = {
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
      latex: {
        class: Latex,
        config: {
          placeholder: 'Enter LaTeX'
        }
      },
      code: {
        class: Code,
        config: {
          placeholder: 'Enter code'
        }
      }
    },
  };
  error = '';
  title: string;
  editMode = false;
  constructor(private httpService: ArticleDataService, private router: Router) {
  }
  ngOnInit() {
    if (this.data) {
      this.title = this.data.layout.title;
      this.config['data'] = this.data.layout;
      this.editMode = true;
    }
    console.log(this.data);
    this.editor = new EditorJS(this.config);
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
   * Событие для присваивания нового значения заголовка при его изменении.
   * @param title Заголовок статьи (событие)
   */
  onTitleChanged(title: string) {
    this.title = title;
  }

  /**
   * Проверяет статью на готовность к отправке.
   * @param articleLayout Layout статьи.
   */
  validate(articleLayout: IArticleLayout) {
    if (articleLayout.title.trim() === '') {
      throw new EmptyTitleError();
    }
    if (articleLayout.blocks.length === 0) {
      throw new EmptyArticleBlocksError();
    }
  }

  /**
   * Сохраняет статью, добавляет к ней заголовок и отправляет на сервер.
   * В случае ошибки - сохраняет текст ошибки в `this.error`, выводит объект ошибки в консоль.
   * @param title Заголовок статьи.
   */
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
        this.validate(articleLayout);
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
        ['/articles', data.id],
      );
    }).catch((error: Error) => {
      console.log('Saving failed', error);
      this.error = error.message;
    });
    // console.log(this.error)
  }
  update(title = this.title) {
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
        this.validate(articleLayout);
        const articleRequest: IArticleRequest = {
          layout: articleLayout,
        };
        console.log(articleRequest);
        this.httpService.update(this.data.id, articleRequest)
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
        ['/articles', data.id],
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
