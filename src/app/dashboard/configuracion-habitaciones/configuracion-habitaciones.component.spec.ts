import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionHabitacionesComponent } from './configuracion-habitaciones.component';

describe('ConfiguracionHabitacionesComponent', () => {
  let component: ConfiguracionHabitacionesComponent;
  let fixture: ComponentFixture<ConfiguracionHabitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionHabitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
