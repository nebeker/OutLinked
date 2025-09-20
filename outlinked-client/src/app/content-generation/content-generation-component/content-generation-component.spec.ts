import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGenerationComponent } from './content-generation-component';

describe('ContentGeneration', () => {
  let component: ContentGenerationComponent;
  let fixture: ComponentFixture<ContentGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
