import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContentRequest } from './models/content-request-model';
import { IContentResponse } from './models/content-response-model';
@Injectable({
  providedIn: 'root',
})
export class ContentGenerationService {
  private webApiUrl = 'http://outlinkedserver:8080/ContentGeneration'; //'http://localhost:5098/ContentGeneration';
  constructor(private http: HttpClient) {}

  public generateContent(request: IContentRequest) {
    return this.http.post<IContentResponse>(this.webApiUrl, request);
  }
}
