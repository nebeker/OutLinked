import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { IContentResponse } from '../models/content-response-model';
import { ContentType } from '../models/content-request-model';

@Component({
  selector: 'app-generated-content-component',
  imports: [MatButtonModule, MatCardModule, ClipboardModule],
  templateUrl: './generated-content-component.html',
  styleUrl: './generated-content-component.css',
})
export class GeneratedContentComponent {
  content=input<IContentResponse | undefined>();

  isReply(content: IContentResponse) {
    return content.contentType == ContentType.Reply;
  }
}
