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

import { IUserPromotionOptions } from '../models/user-promotion-options-model';
import { UserInfoService } from '../user-info-service';

@Component({
  selector: 'app-user-promotion-component',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-promotion-component.html',
  styleUrl: './user-promotion-component.css',
})
export class UserPromotionFormComponent {
  private userInfoService = inject(UserInfoService);
  private fb = inject(FormBuilder);
  promotionForm = this.fb.group({
    plugType: ['', Validators.required],
    plugTitle: ['', Validators.required],
    plugUrl: ['', Validators.required],
  });

  constructor() {
    this.promotionOptions = this.userInfoService.getPromotionOptions();
  }

  editingPromotion = false;
  promotionOptions: IUserPromotionOptions | undefined;

  onPromotionSubmit(): void {
    this.promotionOptions = {
      Title: this.promotionForm.value?.plugTitle ?? '',
      Type: this.promotionForm.value?.plugType ?? '',
      Url: this.promotionForm.value?.plugUrl ?? '',
    };
    this.userInfoService.setPromotionOptions(this.promotionOptions);
    this.editingPromotion = false;
  }
}
