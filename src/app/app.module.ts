import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { EditorTitleComponent } from './editor-title/editor-title.component';
import { ButtonComponent } from './button/button.component';
import { WarningBlockComponent } from './warning-block/warning-block.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { PageBlockComponent } from './page-block/page-block.component';
import { ArticleRendererComponent } from './article-renderer/article-renderer.component';
import { HeaderComponent } from './article-renderer/header/header.component';
import { ParagraphComponent } from './article-renderer/paragraph/paragraph.component';
import { TableComponent } from './article-renderer/table/table.component';
import { LinkComponent } from './article-renderer/link/link.component';
import { ImageComponent } from './article-renderer/image/image.component';
import { ListComponent } from './article-renderer/list/list.component';
import { QuoteComponent } from './article-renderer/quote/quote.component';
import { EmbedComponent } from './article-renderer/embed/embed.component';
import {FormsModule} from '@angular/forms';
import { MultilineInputComponent } from './multiline-input/multiline-input.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorTitleComponent,
    ButtonComponent,
    WarningBlockComponent,
    EditorPageComponent,
    ArticlePageComponent,
    PageBlockComponent,
    ArticleRendererComponent,
    HeaderComponent,
    ParagraphComponent,
    TableComponent,
    LinkComponent,
    ImageComponent,
    ListComponent,
    QuoteComponent,
    EmbedComponent,
    MultilineInputComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [
    HeaderComponent,
    ParagraphComponent,
    TableComponent,
    LinkComponent,
    ImageComponent,
    ListComponent,
    QuoteComponent,
    EmbedComponent,
  ]
})
export class AppModule { }
