import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { Registro } from '../../_models/registro';

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

  loading = false;
  complejo_id: string;
  complejo: Complejo;
  habitacion_id: string;
  habitacion: Habitacion;
  registros: Registro[];
  total_servicios = 0;
  estado_de_habitacion: string;
  ganancia_total = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complejoService: ComplejoService,
    private habitacionesService: HabitacionesService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.HOY_SERVICIO = this.datePipe.transform(this.HOY, 'yyyy-MM-dd');
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
    this.cargarComplejo();
    this.cargarHabitacion();
  }

  inicializarMapas() {
    this.complejo = new Complejo();
    this.habitacion = new Habitacion();
    this.total_servicios = 0;
    this.estado_de_habitacion = 'Desconocido';
    this.ganancia_total = 0;
  }

  cargarComplejo() {
    this.loading = true;
    this.complejoService.obtenerComplejo(this.complejo_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.complejo = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  cargarHabitacion() {
    this.loading = true;
    this.habitacionesService.obtenerHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.habitacion = response.body;
        this.loading = false;
        this.obtenerServiciosPorHabitacion();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  obtenerServiciosPorHabitacion() {
    this.habitacionesService.obtenerServiciosPorHabitacionEntreFechas(this.habitacion.id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
      (response: HttpResponse<any>) => {
        this.total_servicios = response.body.numero_servicios;
        this.estado_de_habitacion = response.body.ultimo_status;
        this.ganancia_total = response.body.numero_servicios * this.habitacion.precio_base;
        this.obtenerRegistrosPorHabitacion();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  obtenerRegistrosPorHabitacion() {
    this.habitacionesService.obtenerRegistrosPorHabitacionEntreFechas(this.habitacion.id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
      (response: HttpResponse<any>) => {
        this.registros = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  actualizarElNumeroDeServicios() {
    this.inicializarMapas();
    this.cargarComplejo();
    this.cargarHabitacion();
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

}
