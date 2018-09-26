import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen-complejo',
  templateUrl: './resumen-complejo.component.html',
  styleUrls: ['./resumen-complejo.component.css']
})
export class ResumenComplejoComponent implements OnInit {

  HOY: number = Date.now();
  HOY_SERVICIO = '2018-09-25';
  FECHA_INICIAL = this.HOY_SERVICIO;
  FECHA_FINAL = this.HOY_SERVICIO;
  tipos_habitacion = TIPOS_HABITACION;

  loading = false;
  complejo_id: string;
  complejo: Complejo;
  habitaciones: Habitacion[];
  servicios_por_habitacion: Map<string, number>;
  estado_de_habitacion: Map<string, string>;
  total_servicios = 0;
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
    this.cargarComplejo();
  }

  inicializarMapas() {
    this.complejo = new Complejo();
    this.habitaciones = new Array<Habitacion>();
    this.servicios_por_habitacion = new Map<string, number>();
    this.estado_de_habitacion = new Map<string, string>();
    this.total_servicios = 0;
    this.ganancia_total = 0;
  }

  cargarComplejo() {
    this.loading = true;
    this.inicializarMapas();
    this.complejoService.obtenerComplejo(this.complejo_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.complejo = response.body;
        this.loading = false;
        this.obtenerHabitacionesPorComplejo();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  obtenerHabitacionesPorComplejo() {
    this.habitacionesService.obtenerHabitacionesPorComplejoId(this.complejo.id).subscribe(
      (response: HttpResponse<Habitacion[]>) => {
        this.habitaciones = response.body;
        this.obtenerServiciosPorHabitaciones(response.body);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  obtenerServiciosPorHabitaciones(habitaciones: Habitacion[]) {
    for (const habitacion of habitaciones) {
      this.habitacionesService.obtenerServiciosPorHabitacionEntreFechas(habitacion.id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
        (response: HttpResponse<any>) => {
          this.servicios_por_habitacion.set(habitacion.id, response.body.numero_servicios);
          this.estado_de_habitacion.set(habitacion.id, response.body.ultimo_status);
          this.total_servicios = this.total_servicios + response.body.numero_servicios;
          this.ganancia_total = this.ganancia_total + (response.body.numero_servicios * habitacion.precio_base);
        },
        (error: HttpErrorResponse) => {
          this.toaster.error(error.status + ' error: ' + error.error.message);
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  actualizarElNumeroDeServicios() {
    this.cargarComplejo();
  }

  getColor(estado_habitacion: string) {
    if (estado_habitacion === 'Servicio') {
      return 'blue';
    }
    return 'gray';
  }

}
