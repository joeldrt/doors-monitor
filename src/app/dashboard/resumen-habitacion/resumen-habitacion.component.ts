import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { Registro } from '../../_models/registro';
import { Sensor, TIPOS_SENSORES } from '../../_models/sensor';
import { SensoresService } from '../../_services/sensores.service';

import { ResumenHabitacion } from '../../_models/resumen_habitacion';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen-habitacion',
  templateUrl: './resumen-habitacion.component.html',
  styleUrls: ['./resumen-habitacion.component.css']
})
export class ResumenHabitacionComponent implements OnInit {

  HOY: number = Date.now();
  HOY_SERVICIO = '2018-09-25';
  FECHA_INICIAL = this.HOY_SERVICIO;
  FECHA_FINAL = this.HOY_SERVICIO;
  tipos_habitacion = TIPOS_HABITACION;

  complejo_id: string;
  complejo: Complejo;
  habitacion_id: string;

  resumen_habitacion: ResumenHabitacion;

  sensores_habitacion: Sensor[];
  dispositivo_id_sensor_nombre: Map<string, string>;
  dispositivo_id_sensor_tipo: Map<string, string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complejoService: ComplejoService,
    private habitacionesService: HabitacionesService,
    private sensoresService: SensoresService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.HOY_SERVICIO = this.datePipe.transform(this.HOY, 'yyyy-MM-dd'); // '2018-09-26';
    this.FECHA_INICIAL = this.HOY_SERVICIO;
    this.FECHA_FINAL = this.HOY_SERVICIO;
    this.complejo_id = this.route.snapshot.params['complejo_id'];
    if (!this.complejo_id) {
      this.toaster.warning('No se especificó el id del complejo');
      this.router.navigate(['/resumen']);
      return;
    }
    this.habitacion_id = this.route.snapshot.params['habitacion_id'];
    if (!this.habitacion_id) {
      this.toaster.warning('No se especificó el id de la habitacion');
      this.router.navigate(['/resumen/complejo', this.complejo_id]);
      return;
    }
    this.inicializarMapas();
    this.cargarSensores();
    this.cargarComplejo();
    this.obtenerResuemenPorHabitacion();
  }

  inicializarMapas() {
    this.complejo = undefined;
    this.resumen_habitacion = undefined;
  }

  cargarComplejo() {
    this.complejoService.obtenerComplejo(this.complejo_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.complejo = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
      }
    );
  }

  obtenerResuemenPorHabitacion() {
    this.habitacionesService.obtenerServiciosPorHabitacionEntreFechas(this.habitacion_id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
      (response: HttpResponse<any>) => {
        this.resumen_habitacion = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
      }
    );
  }

  cargarSensores() {
    this.dispositivo_id_sensor_nombre = new Map<string, string>();
    this.dispositivo_id_sensor_tipo = new Map<string, string>();
    this.sensoresService.obtenerSensoresPorHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<Sensor[]>) => {
        this.sensores_habitacion = response.body;
        this.mapearInfoSensores();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
      }
    );
  }

  mapearInfoSensores() {
    for (const sensor of this.sensores_habitacion) {
      this.dispositivo_id_sensor_nombre.set(sensor.dispositivo_id, sensor.nombre);
      this.dispositivo_id_sensor_tipo.set(sensor.dispositivo_id, TIPOS_SENSORES.get(sensor.tipo_sensor));
    }
  }

  actualizarElNumeroDeServicios() {
    this.inicializarMapas();
    this.cargarSensores();
    this.cargarComplejo();
    this.obtenerResuemenPorHabitacion();
  }

  getColor(estado_habitacion: string) {
    if (estado_habitacion === 'Servicio') {
      return 'blue';
    }
    return 'gray';
  }

  obtenerTipoTarjetaRegistro(tipo_evento: string) {
    if (tipo_evento === 'CERRADO') {
      return 'text-white bg-primary';
    }
    return 'bg-light';
  }

  estampaDeTiempoAFechaLeible(estampa_de_tiempo: string) {
    return estampa_de_tiempo.split('.')[0].replace('T', ' ');
  }

}
