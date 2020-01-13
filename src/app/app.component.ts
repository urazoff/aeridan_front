import { Component } from '@angular/core';
import { ArticleDataService } from './_requests/article-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ArticleDataService]
})
export class AppComponent {
  title = 'article-editor';

}
