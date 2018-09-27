import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Habitacion } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  HOY: number = Date.now();
  HOY_SERVICIO = '2018-09-25';
  FECHA_INICIAL = this.HOY_SERVICIO;
  FECHA_FINAL = this.HOY_SERVICIO;

  loading = false;
  complejos: Complejo[];

  habitaciones_por_complejo: Map<string, Array<Habitacion>>;
  servicios_por_complejo: Map<string, number>;
  servicios_por_habitacion: Map<string, number>;
  estado_de_habitacion: Map<string, string>;
  total_servicios = 0;
  ganancia_total = 0;

  constructor(
    private complejoService: ComplejoService,
    private habitacionesService: HabitacionesService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.HOY_SERVICIO = this.datePipe.transform(this.HOY, 'yyyy-MM-dd');
    this.FECHA_INICIAL = this.HOY_SERVICIO;
    this.FECHA_FINAL = this.HOY_SERVICIO;
    this.cargarComplejos();
  }

  inicializarMapas() {
    this.complejos = undefined;
    this.habitaciones_por_complejo = new Map<string, Array<Habitacion>>();
    this.servicios_por_complejo = new Map<string, number>();
    this.servicios_por_habitacion = new Map<string, number>();
    this.estado_de_habitacion = new Map<string, string>();
    this.total_servicios = 0;
    this.ganancia_total = 0;
  }

  cargarComplejos() {
    this.loading = true;
    this.inicializarMapas();
    this.complejoService.obtenerComplejos().subscribe(
      (response: HttpResponse<Complejo[]>) => {
        this.complejos = response.body;
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
    for (const complejo of this.complejos) {
      this.habitacionesService.obtenerHabitacionesPorComplejoId(complejo.id).subscribe(
        (response: HttpResponse<Habitacion[]>) => {
          this.habitaciones_por_complejo.set(complejo.id, response.body);
          this.obtenerServiciosPorHabitaciones(response.body, complejo.id);
        },
        (error: HttpErrorResponse) => {
          this.toaster.error(error.status + ' error: ' + error.error.message);
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  obtenerServiciosPorHabitaciones(habitaciones: Habitacion[], complejo_id: string) {
    for (const habitacion of habitaciones) {
      this.habitacionesService.obtenerServiciosPorHabitacionEntreFechas(habitacion.id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
        (response: HttpResponse<any>) => {
          this.servicios_por_habitacion.set(habitacion.id, response.body.numero_servicios);
          this.estado_de_habitacion.set(habitacion.id, response.body.ultimo_status);
          this.total_servicios = this.total_servicios + response.body.numero_servicios;
          let ganancia_por_habitacion = 0;
          if (habitacion.precio_base) {
            ganancia_por_habitacion = response.body.numero_servicios * habitacion.precio_base;
          }
          this.ganancia_total = this.ganancia_total + ganancia_por_habitacion;

          const suma_por_complejo = this.servicios_por_complejo.get(complejo_id);
          if (!suma_por_complejo) {
            this.servicios_por_complejo.set(complejo_id, response.body.numero_servicios);
          } else {
            this.servicios_por_complejo.set(complejo_id, (response.body.numero_servicios + suma_por_complejo));
          }
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
    this.cargarComplejos();
  }

}
