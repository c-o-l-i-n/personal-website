import { TestBed } from '@angular/core/testing';

import { ScullyRoutesService } from './mock-scully-routes.service';

describe('MockScullyRoutesService', () => {
  let service: ScullyRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScullyRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
