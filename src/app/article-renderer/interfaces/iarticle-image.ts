export interface IArticleImage {
  caption: string;
  file: IArticleImageFile;
  stretched: boolean;
  withBackground: boolean;
  withBorder: boolean;

}
export interface IArticleImageFile {
  url: string;
}
