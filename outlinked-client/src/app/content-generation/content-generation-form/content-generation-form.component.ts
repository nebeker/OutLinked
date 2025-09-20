import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { IContentRequest, ContentType, IPlugOptions } from '../models/content-request-model'

@Component({
  selector: 'app-content-generation-form',
  templateUrl: './content-generation-form.component.html',
  styleUrl: './content-generation-form.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class ContentGenerationFormComponent {
  private fb = inject(FormBuilder);
  contentRequestForm = this.fb.group({
    post: ['', Validators.required],
    contentType: ContentType.Reply,
    plugType: ['', Validators.required],
    plugTitle: ['', Validators.required],
    plugUrl: ['', Validators.required],
  });

  plugEnabled = false;

  contentTypes = [
    {name: ContentType[ContentType.Post], value: ContentType.Post},
    {name: ContentType[ContentType.Reply], value: ContentType.Reply},
  ];

request: IContentRequest|undefined = {
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

  onSubmit(): void {
    this.request = {
  Post: this.contentRequestForm.value.post!,
  Type: this.contentRequestForm.value.contentType!,
  AuthorIndustry: "",
  AuthorTitle: "",
  PlugEnabled: this.plugEnabled,
  PlugOptions: this.plugEnabled ? {
Type:this.contentRequestForm.value.plugType!,
Title:this.contentRequestForm.value.plugTitle!,
Url:this.contentRequestForm.value.plugUrl!
  }
  :undefined
};

console.log(this.request)
    alert('Thanks!'+this.request);
  }
}
