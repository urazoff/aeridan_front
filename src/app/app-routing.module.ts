import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: EditorPageComponent },
  { path: 'articles/:id', component: ArticlePageComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'notfound', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
