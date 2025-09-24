import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';

import {
  IContentRequest,
  ContentType,
  IPlugOptions,
} from '../models/content-request-model';
import { IContentResponse } from '../models/content-response-model';
import { UserInfoService } from '../../user-info/user-info-service';
import { IUserInfo } from '../../user-info/models/user-info-model';
import { ContentGenerationService } from '../content-generation-service';

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
    MatSpinner,
    ReactiveFormsModule,
    ClipboardModule,
  ],
})
export class ContentGenerationFormComponent {
  private userInfoService = inject(UserInfoService);
  private generationService = inject(ContentGenerationService);
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
    { name: ContentType[ContentType.Post], value: ContentType.Post },
    { name: ContentType[ContentType.Reply], value: ContentType.Reply },
  ];

  request: IContentRequest = {
    Post: '',
    Type: 1,
    AuthorIndustry: '',
    AuthorTitle: '',
    PlugEnabled: false,
    PlugOptions: undefined,
  };

  plugOptions: IPlugOptions = {
    Type: '',
    Title: '',
    Url: '',
  };

  userInfo: IUserInfo | undefined;

  generatedContent: IContentResponse[] = [];

  ngOnInit() {
    var savedPlugOptions = this.userInfoService.getPromotionOptions();
    if (savedPlugOptions) this.plugOptions = savedPlugOptions;
    this.userInfo = this.userInfoService.getUserInfo();
  }

  loading = false;

  onSubmit(): void {
    this.request = {
      Post: this.contentRequestForm.value.post!,
      Type: this.contentRequestForm.value.contentType!,
      AuthorIndustry: this.userInfo?.AuthorIndustry ?? '',
      AuthorTitle: this.userInfo?.AuthorTitle ?? '',
      PlugEnabled: this.plugEnabled,
      PlugOptions: this.plugEnabled
        ? {
            Type: this.contentRequestForm.value.plugType!,
            Title: this.contentRequestForm.value.plugTitle!,
            Url: this.contentRequestForm.value.plugUrl!,
          }
        : undefined,
    };

    this.loading = true;
    console.log(this.request);

    var result = this.generationService
      .generateContent(this.request)
      .subscribe((data) => {
        this.generatedContent.push(data);
        this.loading = false;
      });
  }

  isReply(content: IContentResponse) {
    return content.contentType == ContentType.Reply;
  }
}
