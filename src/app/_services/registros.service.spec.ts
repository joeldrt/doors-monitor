import { TestBed, inject } from '@angular/core/testing';

import { RegistrosService } from './registros.service';

describe('Registros.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrosService]
    });
  });

  it('should be created', inject([RegistrosService], (service: RegistrosService) => {
    expect(service).toBeTruthy();
  }));
});
