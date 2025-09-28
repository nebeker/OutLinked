import { inject, Injectable } from '@angular/core';
import { IUserInfo } from './models/user-info-model';
import { IPlugOptions } from '../content-generation/models/plug-options-model';
import { IUserPromotionOptions } from './models/user-promotion-options-model';
import { LocalStorageService } from '../local-storage/local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userInfoKey = 'OutLInkedUserInfo';
  private promotionOptionsKey = 'OutLInkedPromotionOptions';
  private userInfo: IUserInfo | undefined;
  private promotionOptions: IUserPromotionOptions | undefined;
  private useLocalStorage: boolean = false;
  private localStorageService = inject(LocalStorageService);

  public setUserInfo(info: IUserInfo) {
    this.userInfo = info;
    this.localStorageService.setItem(this.userInfoKey, this.userInfo);
  }

  public getUserInfo(): IUserInfo | undefined {
    var storedUserInfo = this.localStorageService.getItem<IUserInfo>(
      this.userInfoKey
    );
    if (storedUserInfo) this.userInfo = storedUserInfo;
    return this.userInfo;
  }

  public setPromotionOptions(options: IUserPromotionOptions) {
    this.promotionOptions = options;
    this.localStorageService.setItem(
      this.promotionOptionsKey,
      this.promotionOptions
    );
  }

  public getPromotionOptions(): IPlugOptions | undefined {
    var storedPromotionOptions = this.localStorageService.getItem<IPlugOptions>(
      this.promotionOptionsKey
    );
    if (storedPromotionOptions) this.promotionOptions = storedPromotionOptions;
    return this.promotionOptions;
  }
}
