import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockScullyContentComponent } from './mock-scully-content.component';

describe('MockSkullyContentComponent', () => {
  let component: MockScullyContentComponent;
  let fixture: ComponentFixture<MockScullyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockScullyContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockScullyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
