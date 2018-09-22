import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSensoresDetalleComponent } from './configuracion-sensores-detalle.component';

describe('ConfiguracionSensoresDetalleComponent', () => {
  let component: ConfiguracionSensoresDetalleComponent;
  let fixture: ComponentFixture<ConfiguracionSensoresDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionSensoresDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionSensoresDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
