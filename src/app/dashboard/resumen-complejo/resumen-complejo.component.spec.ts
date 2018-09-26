import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComplejoComponent } from './resumen-complejo.component';

describe('ResumenComplejoComponent', () => {
  let component: ResumenComplejoComponent;
  let fixture: ComponentFixture<ResumenComplejoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenComplejoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
