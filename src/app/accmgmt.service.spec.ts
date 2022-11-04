import { TestBed } from '@angular/core/testing';

import { AccmgmtService } from './accmgmt.service';

describe('AccmgmtService', () => {
  let service: AccmgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccmgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
