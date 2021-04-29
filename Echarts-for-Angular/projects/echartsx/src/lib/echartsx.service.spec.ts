import { TestBed } from '@angular/core/testing';

import { EchartsxService } from './echartsx.service';

describe('EchartsxService', () => {
  let service: EchartsxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchartsxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
