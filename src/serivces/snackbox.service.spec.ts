import { TestBed } from '@angular/core/testing';

import { SnackboxService } from './snackbox.service';

describe('SnackboxService', () => {
  let service: SnackboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
