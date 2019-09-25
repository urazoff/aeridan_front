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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
