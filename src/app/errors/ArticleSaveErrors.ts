export class EmptyTitleError extends Error {
  constructor() {
    super('The title is empty. Before publishing an article, write a title.');
  }
}

export class EmptyArticleBlocksError extends Error {
  constructor() {
    super('The article is empty. Before publishing an article, write at least one paragraph.');
  }
}
