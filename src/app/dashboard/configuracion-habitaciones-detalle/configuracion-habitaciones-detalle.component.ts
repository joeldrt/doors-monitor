import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Habitacion, TIPOS_HABITACION } from '../../_models/habitacion';
import { HabitacionesService } from '../../_services/habitaciones.service';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private habitacionesService: HabitacionesService,
    private complejoService: ComplejoService
  ) { }

  ngOnInit() {
    this.habitacion_id = this.route.snapshot.params['habitacion_id'];
    if (!this.habitacion_id) {
      this.toaster.warning('No se especificó el id de la habitación');
      this.router.navigate(['/configuracion/habitaciones']);
      return;
    }
    this.obtenerDetalleHabitacion();
  }

  obtenerDetalleHabitacion() {
    this.loading = true;
    this.habitacionesService.obtenerHabitacion(this.habitacion_id).subscribe(
      (response: HttpResponse<Habitacion>) => {
        this.habitacion = response.body;
        this.loading = false;
        this.obtenerComplejo();
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

}
