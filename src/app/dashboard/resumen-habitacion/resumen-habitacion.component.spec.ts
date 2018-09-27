import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenHabitacionComponent } from './resumen-habitacion.component';

describe('ResumenHabitacionComponent', () => {
  let component: ResumenHabitacionComponent;
  let fixture: ComponentFixture<ResumenHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
