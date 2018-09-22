import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Sensor, TIPOS_SENSORES } from '../../_models/sensor';
import { SensoresService } from '../../_services/sensores.service';

@Component({
  selector: 'app-configuracion-sensores-detalle',
  templateUrl: './configuracion-sensores-detalle.component.html',
  styleUrls: ['./configuracion-sensores-detalle.component.css']
})
export class ConfiguracionSensoresDetalleComponent implements OnInit {
  loading = false;
  editing = false;

  sensor_id: string;
  sensor: Sensor;

  tipos_sensores = TIPOS_SENSORES;
  dispositivos_sin_registrar: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private sensoresService: SensoresService
  ) { }

  ngOnInit() {
    this.sensor_id = this.route.snapshot.params['sensor_id'];
    if (!this.sensor_id) {
      this.toaster.warning('No hay un id de sensor');
      this.router.navigate(['/configuracion/sensores']);
      return;
    }
    this.obtenerDetalleSensor();
    this.obtenerDispositivosSinRegistrar();
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

  obtenerDetalleSensor() {
    this.loading = true;
    this.sensoresService.obtenerSensor(this.sensor_id).subscribe(
      (response: HttpResponse<Sensor>) => {
        this.sensor = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
        this.router.navigate(['/configuracion/sensores']);
      }
    );
  }

  ponerModoEdicion() {
    this.editing = true;
  }

  editarSensor() {
    if (!this.sensor.dispositivo_id || !this.sensor.nombre || !this.sensor.tipo_sensor) {
      this.toaster.error('Es obligatorio llenar todos los campos');
      return;
    }
    this.loading = true;
    this.sensoresService.editarSensor(this.sensor_id, this.sensor).subscribe(
      (response: HttpResponse<Sensor>) => {
        this.loading = false;
        this.editing = false;
        this.sensor = response.body;
        this.obtenerDispositivosSinRegistrar();
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

  borrarSensor() {
    this.sensoresService.borrarSensor(this.sensor_id).subscribe(
      (response: HttpResponse<any>) => {
        this.toaster.success('Sensor borrado exitosamente');
        this.loading = false;
        this.router.navigate(['/configuracion/sensores']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

}
