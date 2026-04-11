import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';

import {
  IContentRequest,
  ContentType,
  IPlugOptions,
  IModel,
} from '../models/content-request-model';
import { IContentResponse } from '../models/content-response-model';
import { UserInfoService } from '../../user-info/user-info-service';
import { IUserInfo } from '../../user-info/models/user-info-model';
import { ContentGenerationService } from '../content-generation-service';
import { GeneratedContentComponent } from '../generated-content-compnent/generated-content-component';
@Component({
  selector: 'app-content-generation-form',
  templateUrl: './content-generation-form.component.html',
  styleUrl: './content-generation-form.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSpinner,
    ReactiveFormsModule,
    GeneratedContentComponent,
  ],
})
export class ContentGenerationFormComponent {
  private userInfoService = inject(UserInfoService);
  private generationService = inject(ContentGenerationService);
  private fb = inject(FormBuilder);
  contentRequestForm = this.fb.group({
    post: ['', Validators.required],
    contentType: ContentType.Reply,
    model: [''],
    plugType: ['', Validators.required],
    plugTitle: ['', Validators.required],
    plugUrl: ['', Validators.required],
  });

  plugEnabled = false;
  contentTypes = [
    { name: ContentType[ContentType.Post], value: ContentType.Post },
    { name: ContentType[ContentType.Reply], value: ContentType.Reply },
  ];
  models: IModel[] = [
    { name: "Default", value: null },
  ];

  request: IContentRequest = {
    Post: '',
    Type: 1,
    AuthorIndustry: '',
    AuthorTitle: '',
    PlugEnabled: false,
    PlugOptions: undefined,
    Model: null,
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
    this.generationService.getModels().subscribe({
      next: (data) => {
        if (data) {
          data.forEach(element => {
            this.models.push({
              name: element,
              value: element,
            });
          });
        } else {
          console.log('No data returned');
          this.error = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.error = true;
      },
    });
  }

  loading = false;
  error = false;

  onSubmit(): void {
    this.request = {
      Post: this.contentRequestForm.value.post!,
      Type: this.contentRequestForm.value.contentType!,
      AuthorIndustry: this.userInfo?.AuthorIndustry ?? '',
      AuthorTitle: this.userInfo?.AuthorTitle ?? '',
      Model: this.contentRequestForm.value.model ?? null,
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
      .subscribe({
        next: (data) => {
          if (data) {
            this.generatedContent.push(data);
            this.loading = false;
            this.error = false;
          } else {
            console.log('No data returned');
            this.loading = false;
            this.error = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.error = true;
        },
      });
  }

  getGeneratedContent(): IContentResponse[] {
    return this.generatedContent.sort(
      (a, b) =>
        new Date(b.timeGenerated).getTime() -
        new Date(a.timeGenerated).getTime(),
    );
  }

  clearContent() {
    this.error = false;
    this.generatedContent = [];
  }
}
