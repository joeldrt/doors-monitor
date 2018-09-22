import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Sensor, TIPOS_SENSORES } from '../../_models/sensor';
import { SensoresService } from './../../_services/sensores.service';

@Component({
  selector: 'app-configuracion-habitaciones-detalle',
  templateUrl: './configuracion-habitaciones-detalle.component.html',
  styleUrls: ['./configuracion-habitaciones-detalle.component.css']
})
export class ConfiguracionHabitacionesDetalleComponent implements OnInit {
  loading = false;
  editing = false;

  habitacion_id: string;
  habitacion: Habitacion;
  complejo: Complejo;
  tipos_habitacion = TIPOS_HABITACION;

  tipos_sensores = TIPOS_SENSORES;
  sensores_habitacion: Sensor[];

  sensor_a_vincular: Sensor;
  sensores_sin_vincular: Sensor[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private habitacionesService: HabitacionesService,
    private complejoService: ComplejoService,
    private sensoresService: SensoresService
  ) { }

  ngOnInit() {
    this.habitacion_id = this.route.snapshot.params['habitacion_id'];
    if (!this.habitacion_id) {
      this.toaster.warning('No se especificó el id de la habitación');
      this.router.navigate(['/configuracion/habitaciones']);
      return;
    }
    this.sensor_a_vincular = new Sensor();
    this.obtenerDetalleHabitacion();
    this.obtenerSensoresSinVincular();
  }

  obtenerDetalleHabitacion() {
    this.loading = true;
    this.habitacionesService.obtenerHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<Habitacion>) => {
        this.habitacion = response.body;
        this.loading = false;
        this.obtenerComplejo();
        this.obtenerSensoresPorHabitacion();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
        this.router.navigate(['/configuracion/habitaciones']);
      }
    );
  }

  obtenerComplejo() {
    this.loading = true;
    this.complejoService.obtenerComplejo(this.habitacion.complejo_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.complejo = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  ponerModoEdicion() {
    this.editing = true;
  }

  editarHabitacion() {
    if (!this.habitacion.complejo_id || !this.habitacion.nombre) {
      this.toaster.error('Es obligatorio poner un nombre');
      return;
    }
    this.loading = true;
    this.habitacionesService.editarHabitacion(this.habitacion_id, this.habitacion).subscribe(
      (response: HttpResponse<Habitacion>) => {
        this.loading = false;
        this.editing = false;
        this.habitacion = response.body;
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
    const keys = Array.from(this.tipos_habitacion.keys());
    return keys;
  }

  obtenerSensoresPorHabitacion() {
    this.loading = true;
    this.sensoresService.obtenerSensoresPorHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<Sensor[]>) => {
        this.loading = false;
        this.sensores_habitacion = response.body;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  obtenerSensoresSinVincular() {
    this.loading = true;
    this.sensoresService.obtenerSensoresSinvincular().subscribe(
      (response: HttpResponse<Sensor[]>) => {
        this.loading = false;
        this.sensores_sin_vincular = response.body;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  vincularSensor() {
    this.loading = true;
    this.sensor_a_vincular.habitacion_id = this.habitacion_id;
    this.sensoresService.editarSensor(this.sensor_a_vincular.id, this.sensor_a_vincular).subscribe(
      (response: HttpResponse<Sensor>) => {
        this.loading = false;
        this.sensor_a_vincular = new Sensor();
        this.obtenerSensoresPorHabitacion();
        this.obtenerSensoresSinVincular();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  desvincularSensor(sensor: Sensor) {
    this.loading = true;
    sensor.habitacion_id = undefined;
    this.sensoresService.editarSensor(sensor.id, sensor).subscribe(
      (response: HttpResponse<Sensor>) => {
        this.loading = false;
        this.obtenerSensoresPorHabitacion();
        this.obtenerSensoresSinVincular();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  borrarHabitacion() {
    this.loading = true;
    this.habitacionesService.borrarHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<any>) => {
        this.loading = false;
        this.router.navigate(['/configuracion/habitaciones']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

}
