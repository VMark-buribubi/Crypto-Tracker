import { TestBed } from '@angular/core/testing';
import { CryptoService } from './crypto';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService],
    });
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
