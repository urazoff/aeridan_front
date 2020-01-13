import {IArticleBlock} from './IArticleBlock';

export interface IArticleLayout {
    title: string;
    time: number;
    blocks: Array<IArticleBlock>;
    version: string;
}
export interface IArticle {
    createdAt: number;
    updatedAt: number;
    id: string;
    layout: IArticleLayout;
    owner: object;
}

