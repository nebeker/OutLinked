import { Injectable } from '@angular/core';
import { IUserInfo } from './models/user-info-model';
import { IPlugOptions } from '../content-generation/models/plug-options-model';
import { IUserPromotionOptions } from './models/user-promotion-options-model';
@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userInfo: IUserInfo | undefined;
  private promotionOptions: IUserPromotionOptions | undefined;

  public setUserInfo(info: IUserInfo) {
    this.userInfo = info;
  }

  public getUserInfo(): IUserInfo | undefined {
    return this.userInfo;
  }

  public getPromotionOptions(): IPlugOptions | undefined {
    return this.promotionOptions;
  }

  public setPromotionOptions(options: IUserPromotionOptions) {
    this.promotionOptions = options;
  }
}
