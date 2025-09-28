import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedContentCompnent } from './generated-content-component';

describe('GeneratedContentCompnent', () => {
  let component: GeneratedContentCompnent;
  let fixture: ComponentFixture<GeneratedContentCompnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratedContentCompnent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratedContentCompnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
