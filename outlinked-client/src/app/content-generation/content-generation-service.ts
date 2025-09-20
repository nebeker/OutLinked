import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContentRequest } from './models/content-request-model';
@Injectable({
  providedIn: 'root',
})
export class ContentGenerationService {
  private webApiUrl = 'http://localhost:5098/ContentGeneration';
  constructor(private http: HttpClient) {}

  public generateContent(request: IContentRequest) {
    return this.http.post<string>(this.webApiUrl, request);
  }
}
