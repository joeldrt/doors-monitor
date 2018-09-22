import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Sensor, TIPOS_SENSORES } from '../../_models/sensor';
import { SensoresService } from '../../_services/sensores.service';

@Component({
  selector: 'app-configuracion-sensores',
  templateUrl: './configuracion-sensores.component.html',
  styleUrls: ['./configuracion-sensores.component.css']
})
export class ConfiguracionSensoresComponent implements OnInit {
  loading = false;

  sensores: Sensor[];

  sensor_nuevo: Sensor;
  dispositivos_sin_registrar: string[];

  tipos_sensores = TIPOS_SENSORES;

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private sensoresService: SensoresService
  ) { }

  ngOnInit() {
    this.sensores = new Array();
    this.sensor_nuevo = new Sensor();
    this.obtenerSensoresPorPropietario();
    this.obtenerDispositivosSinRegistrar();
  }

  obtenerSensoresPorPropietario() {
    this.loading = true;
    this.sensoresService.obtenerSensoresPorPropietario().subscribe(
      (response: HttpResponse<Sensor[]>) => {
        this.sensores = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  obtenerDispositivosSinRegistrar() {
    this.loading = true;
    this.sensoresService.obtenerDispositivosSinRegistrar().subscribe(
      (response: HttpResponse<string[]>) => {
        this.dispositivos_sin_registrar = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  tipos_keys(): string[] {
    const keys = Array.from(this.tipos_sensores.keys());
    return keys;
  }

  agregarSensorNuevo() {
    this.loading = true;
    this.sensoresService.guardarSensor(this.sensor_nuevo).subscribe(
      (response: HttpResponse<Sensor>) => {
        this.loading = false;
        this.toaster.success('Sensor guardada');
        this.obtenerSensoresPorPropietario();
        this.obtenerDispositivosSinRegistrar();
        this.sensor_nuevo = new Sensor();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

}
