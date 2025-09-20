import { Component } from '@angular/core';
import { UserInfoFormComponent } from '../user-info-form/user-info-form';
import { UserPromotionFormComponent } from '../user-promotion-component/user-promotion-component';
@Component({
  selector: 'app-user-info-component',
  imports: [UserInfoFormComponent, UserPromotionFormComponent],
  templateUrl: './user-info-component.html',
  styleUrl: './user-info-component.css',
})
export class UserInfoComponent {}
