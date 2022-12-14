import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SayHelloService } from './say-hello.service';

describe('SayHelloService', () => {
  let service: SayHelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SayHelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
