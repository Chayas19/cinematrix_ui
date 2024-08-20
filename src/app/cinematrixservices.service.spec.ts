import { TestBed } from '@angular/core/testing';

import { CinematrixservicesService } from './cinematrixservices.service';

describe('CinematrixservicesService', () => {
  let service: CinematrixservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinematrixservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
