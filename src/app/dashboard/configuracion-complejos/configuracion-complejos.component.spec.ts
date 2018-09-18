import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionComplejosComponent } from './configuracion-complejos.component';

describe('ConfiguracionComplejosComponent', () => {
  let component: ConfiguracionComplejosComponent;
  let fixture: ComponentFixture<ConfiguracionComplejosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionComplejosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionComplejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
