import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceRowComponent } from './work-experience-row.component';

describe('WorkExperienceRowComponent', () => {
  let component: WorkExperienceRowComponent;
  let fixture: ComponentFixture<WorkExperienceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkExperienceRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
