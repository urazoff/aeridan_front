import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PageContainerComponent} from './page-container/page-container.component';
import {LoginPageComponent} from './login-page/login-page.component';

const pagesRoutes = [
  { path: '', component: EditorPageComponent },
  { path: 'edit/:id', component: EditorPageComponent },
  { path: 'articles/:id', component: ArticlePageComponent },
  { path: 'login', component: LoginPageComponent }
];

const routes: Routes = [
  { path: '', component: PageContainerComponent, children: pagesRoutes },
  { path: ':language', component: PageContainerComponent, children: pagesRoutes },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
