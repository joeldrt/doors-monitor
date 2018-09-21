import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionHabitacionesDetalleComponent } from './configuracion-habitaciones-detalle.component';

describe('ConfiguracionHabitacionesDetalleComponent', () => {
  let component: ConfiguracionHabitacionesDetalleComponent;
  let fixture: ComponentFixture<ConfiguracionHabitacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionHabitacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionHabitacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
