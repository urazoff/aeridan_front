export interface IArticleLayout {
    title: string;
    time: number;
    blocks: Array<object>;
    version: string;
}
export interface IArticle {
    createdAt: number;
    updatedAt: number;
    id: number;
    layout: IArticleLayout;
    owner: number;
}

