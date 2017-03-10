import { TestBed, inject } from '@angular/core/testing';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphService]
    });
  });

  it('should load graph instance', inject([GraphService], (service: GraphService) => {
    expect(service.loadGraph()).toBeTruthy();
  }));
});
