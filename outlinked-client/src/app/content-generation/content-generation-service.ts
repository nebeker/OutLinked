import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContentRequest } from './models/content-request-model';
import { IContentResponse } from './models/content-response-model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ContentGenerationService {
  private webApiUrl = environment.serverUrl;
  constructor(private http: HttpClient) {}

  public generateContent(request: IContentRequest) {
    console.log(this.webApiUrl)
    return this.http.post<IContentResponse>(this.webApiUrl, request, {
      mode: 'cors',
    });
  }
}
