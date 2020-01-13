import { IArticleLayout } from './IArticle';
export interface IArticleRequest {
    layout: IArticleLayout;
    owner?: string;
}
