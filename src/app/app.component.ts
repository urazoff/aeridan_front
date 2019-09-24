import { Component } from '@angular/core';
import { ArticleDataService } from './article-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ArticleDataService]
})
export class AppComponent {
  title = 'article-editor';
}
