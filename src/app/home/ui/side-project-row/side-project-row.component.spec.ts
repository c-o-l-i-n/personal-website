import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProjectRowComponent } from './side-project-row.component';

describe('WorkExperienceRowComponent', () => {
  let component: SideProjectRowComponent;
  let fixture: ComponentFixture<SideProjectRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideProjectRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideProjectRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
