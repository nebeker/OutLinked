import { Component } from '@angular/core';
import {
  IContentRequest,
  ContentType,
  IPlugOptions,
} from '../models/content-request-model';
import { ContentGenerationFormComponent } from '../content-generation-form/content-generation-form.component';
@Component({
  selector: 'app-content-generation-component',
  imports: [ContentGenerationFormComponent],
  templateUrl: './content-generation-component.html',
  styleUrl: './content-generation-component.css',
})
export class ContentGenerationComponent {
  reply: string | undefined;
  quotePost: string | undefined;

  onGenerateSubmit() {}
}
