import {Component, Input, OnInit} from '@angular/core';
import EditorJS from './editorjs';
import Embed from '@editorjs/embed';
import Header from './plugins/header';
// import Image from '@editorjs/image';
import Link from './plugins/link';
import List from './plugins/list';
import Quote from './plugins/quote';
// import Table from '@editorjs/table';
import Table from './plugins/table';
import Image from './plugins/image';
import Katex from './plugins/katex';
import Code from './plugins/code';
import InlineCode from '@editorjs/inline-code';
import Delimiter from '@editorjs/delimiter';
import {ArticleDataService} from '../article-data.service';
import {IArticleLayout, IArticle} from '../interfaces/IArticle';
import {IArticleRequest} from '../interfaces/IArticleRequest';
import {Router} from '@angular/router';
import {EmptyArticleBlocksError, EmptyTitleError} from '../errors/ArticleSaveErrors';
import {LanguageService} from '../localization/language.service';

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
    placeholder: this.lang.translate('PARAGRAPH_TOOL_PLACEHOLDER'),
    tools: {
      heading: {
        class: Header,
        config: {
          title: this.lang.translate('HEADER_TOOL_TITLE'),
          placeholder: this.lang.translate('HEADER_TOOL_PLACEHOLDER'),
        }
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          title: this.lang.translate('LIST_TOOL_TITLE'),
        }
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          title: this.lang.translate('TABLE_TOOL_TITLE'),
        }
      },
      image: {
        class: Image,
        config: {
          title: this.lang.translate('IMAGE_TOOL_TITLE'),
          captionPlaceholder: this.lang.translate('IMAGE_TOOL_CAPTION_PLACEHOLDER'),
          buttonContent: this.lang.translate('IMAGE_TOOL_BUTTON_CONTENT'),
          errorMessage: this.lang.translate('IMAGE_TOOL_ERROR_MESSAGE'),
          endpoints: {
            byFile: 'https://dilshod.xyz/api/v1/image/upload', // Your backend file uploader endpoint
            // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
          }
        }
      },
      reference: {
        class: Link,
        config: {
          title: this.lang.translate('LINK_TOOL_TITLE'),
          endpoint: 'https://dilshod.xyz/api/v1/link', // Your backend endpoint for url data fetching
          placeholder: this.lang.translate('LINK_TOOL_PLACEHOLDER')
        }
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
            codepen: true,
            imgur: true,
            gfycat: true,
            'twitch-video': true,
            'twitch-channel': true,
            vimeo: true,
            vine: true,
            'yandex-music-track': true,
            'yandex-music-album': true,
            'yandex-music-playlist': true
          }
        }
      },
      quote: {
        class: Quote,
        config: {
          title: this.lang.translate('QUOTE_TOOL_TITLE'),
          quotePlaceholder: this.lang.translate('QUOTE_TOOL_QUOTE_PLACEHOLDER'),
          captionPlaceholder: this.lang.translate('QUOTE_TOOL_CAPTION_PLACEHOLDER'),
        }
      },
      katex: {
        class: Katex,
        config: {
          title: this.lang.translate('KATEX_TOOL_TITLE'),
          placeholder: this.lang.translate('KATEX_TOOL_PLACEHOLDER')
        }
      },
      code: {
        class: Code,
        config: {
          title: this.lang.translate('CODE_TOOL_TITLE'),
          placeholder: this.lang.translate('CODE_TOOL_PLACEHOLDER')
        }
      },
      inlineCode: {
        class: InlineCode,
      },
      delimiter: {
        class: Delimiter,
        config: {
          title: this.lang.translate('DELIMITER_TOOL_TITLE'),
        }
      }
    },
  };
  error = '';
  title: string;
  editMode = false;
  constructor(private httpService: ArticleDataService, private router: Router, public lang: LanguageService) {
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
        [`/${this.lang.userLang}/articles/${data.id}`],
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
        [`/${this.lang.userLang}/articles/${data.id}`],
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
