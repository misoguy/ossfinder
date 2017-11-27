export interface IPageInfo {
  endCursor: string;
  hasNextPage: string;
  hasPreviousPage: string;
  startCursor: string;
}

export interface IRepository {
  id: string;
  nameWithOwner: string;
  url: string;
  descriptionHTML: string;
}

export interface ILabel {
  id: string;
  name: string;
  color: string;
}
