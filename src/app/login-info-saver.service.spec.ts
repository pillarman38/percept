import { TestBed } from '@angular/core/testing';

import { LoginInfoSaverService } from './login-info-saver.service';

describe('LoginInfoSaverService', () => {
  let service: LoginInfoSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInfoSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
