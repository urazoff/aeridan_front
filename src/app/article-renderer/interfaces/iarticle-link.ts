export interface IArticleLink {
  link: string;
  meta: IArticleLinkMeta;
}
export interface IArticleLinkMeta {
  description?: string;
  image?: IArticleLinkMetaImage;
  title: string;
}
export interface IArticleLinkMetaImage {
  url: string;
}
