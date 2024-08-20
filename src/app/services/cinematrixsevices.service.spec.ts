import { TestBed } from '@angular/core/testing';

import { CinematrixsevicesService } from './cinematrixsevices.service';

describe('CinematrixsevicesService', () => {
  let service: CinematrixsevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinematrixsevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
