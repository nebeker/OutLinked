export interface IContentResponse {
  generatedContent: string;
  contentType: ContentType;
  timeGenerated: Date;
}

export enum ContentType {
  Reply = 1,
  Post = 2,
}
