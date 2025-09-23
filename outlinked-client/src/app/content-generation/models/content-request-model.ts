import { IPlugOptions } from './plug-options-model';
export { type IPlugOptions } from './plug-options-model';
export interface IContentRequest {
  Post: string;
  Type: ContentType;
  AuthorIndustry: string;
  AuthorTitle: string;
  PlugEnabled: boolean;
  PlugOptions: IPlugOptions | undefined;
}

export enum ContentType {
  Reply = 1,
  Post = 2,
}
