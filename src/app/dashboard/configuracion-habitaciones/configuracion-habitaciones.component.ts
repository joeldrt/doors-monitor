import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';


@Component({
  selector: 'app-configuracion-habitaciones',
  templateUrl: './configuracion-habitaciones.component.html',
  styleUrls: ['./configuracion-habitaciones.component.css']
})
export class ConfiguracionHabitacionesComponent implements OnInit {
  loading = false;

  complejos: Complejo[];
  habitaciones_por_complejo: Map<string, Array<Habitacion>>;

  complejo_seleccionado: Complejo;
  habitacion_nueva: Habitacion;

  tipos_habitacion = TIPOS_HABITACION;

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private complejoService: ComplejoService,
    private habitacionService: HabitacionesService
  ) {
    this.habitaciones_por_complejo = new Map<string, Array<Habitacion>>();
  }

  ngOnInit() {
    this.loading = true;
    this.complejos = new Array();
    this.complejo_seleccionado = new Complejo();
    this.habitacion_nueva = new Habitacion();
    this.habitaciones_por_complejo = new Map<string, Array<Habitacion>>();
    this.complejoService.obtenerComplejos().subscribe(
      (response: HttpResponse<Complejo[]>) => {
        this.complejos = response.body;
        this.loading = false;
        if (this.complejos.length <= 0) {
          this.toaster.error('No existen COMPLEJOS registrados, son necesarios para agregar una habitación');
          this.router.navigate(['/configuracion/complejos']);
          return;
        }
        this.obtenerHabitacionesPorComplejo();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  obtenerHabitacionesPorComplejo() {
    for (const complejo of this.complejos) {
      this.habitacionService.obtenerHabitacionesPorComplejoId(complejo.id).subscribe(
        (response: HttpResponse<Habitacion[]>) => {
          this.habitaciones_por_complejo.set(complejo.id, response.body);
        },
        (error: HttpErrorResponse) => {
          this.toaster.error(error.status + ' error: ' + error.error.message);
        }
      );
    }
  }

  agregarHabitacionNueva() {
    this.habitacion_nueva.complejo_id = this.complejo_seleccionado.id;
    this.habitacionService.guardarHabitacion(this.habitacion_nueva).subscribe(
      (response: HttpResponse<Habitacion>) => {
        this.toaster.success('habitación guardada');
        this.obtenerHabitacionesPorComplejo();
        this.complejo_seleccionado = undefined;
        this.habitacion_nueva = new Habitacion();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

}
