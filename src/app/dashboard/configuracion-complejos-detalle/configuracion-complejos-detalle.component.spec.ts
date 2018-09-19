import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionComplejosDetalleComponent } from './configuracion-complejos-detalle.component';

describe('ConfiguracionComplejosDetalleComponent', () => {
  let component: ConfiguracionComplejosDetalleComponent;
  let fixture: ComponentFixture<ConfiguracionComplejosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionComplejosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionComplejosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
