import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { IUserInfo } from '../models/user-info-model';
import { UserInfoService } from '../user-info-service';

@Component({
  selector: 'app-user-info-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.css',
})
export class UserInfoFormComponent {
  private userInfoService = inject(UserInfoService);
  private fb = inject(FormBuilder);
  userInfoForm = this.fb.group({
    authorIndustry: ['', Validators.required],
    authorTitle: ['', Validators.required],
  });

  constructor() {
    this.userInfo = this.userInfoService.getUserInfo();
  }

  editingUser = false;
  userInfo: IUserInfo | undefined;

  onUserSubmit(): void {
    this.userInfo = {
      AuthorIndustry: this.userInfoForm.value?.authorIndustry ?? '',
      AuthorTitle: this.userInfoForm.value?.authorTitle ?? '',
    };
    this.userInfoService.setUserInfo(this.userInfo);
    this.editingUser = false;
  }
}
