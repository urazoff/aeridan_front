import {IArticleBlock} from './iarticle-block';

export interface IArticleLayout {
    title: string;
    time: number;
    blocks: Array<IArticleBlock>;
    version: string;
}
export interface IArticle {
    createdAt: number;
    updatedAt: number;
    id: number;
    layout: IArticleLayout;
    owner: object;
}

