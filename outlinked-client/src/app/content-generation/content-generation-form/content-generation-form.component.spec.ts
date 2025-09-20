import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGenerationFormComponent } from './content-generation-form.component';

describe('ContentGenerationFormComponent', () => {
  let component: ContentGenerationFormComponent;
  let fixture: ComponentFixture<ContentGenerationFormComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGenerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
