import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSensoresComponent } from './configuracion-sensores.component';

describe('ConfiguracionSensoresComponent', () => {
  let component: ConfiguracionSensoresComponent;
  let fixture: ComponentFixture<ConfiguracionSensoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionSensoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
