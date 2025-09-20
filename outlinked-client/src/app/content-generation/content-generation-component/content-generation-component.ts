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
  Type: 1,
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

  reply: string | undefined;
  quotePost: string | undefined;

  onGenerateSubmit(contentForm: NgForm)
  {
    console.log(contentForm.value)
  }
}
