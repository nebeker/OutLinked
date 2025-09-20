import { Component } from '@angular/core';
import { IContentRequest, ContentType, IPlugOptions } from '../models/content-request-model'
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-content-generation-component',
  imports: [FormsModule],
  templateUrl: './content-generation-component.html',
  styleUrl: './content-generation-component.css'
})
export class ContentGenerationComponent {
  request: IContentRequest = {
  Post: "",
  Type: ContentType.Post,
  AuthorIndustry: "",
  AuthorTitle: "",
  PlugEnabled: false,
  PlugOptions: undefined
};
  plugOptions: IPlugOptions = {
Type:"",
Title:"",
Url:""
  };

  contentForm:NgForm
  reply: string | undefined;
  quotePost: string | undefined;

}
