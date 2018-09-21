import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

@Component({
  selector: 'app-configuracion-complejos-detalle',
  templateUrl: './configuracion-complejos-detalle.component.html',
  styleUrls: ['./configuracion-complejos-detalle.component.css']
})
export class ConfiguracionComplejosDetalleComponent implements OnInit {
  loading = false;
  editing = false;

  complejo_id: string;
  complejo: Complejo;
  telefonos: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private complejoService: ComplejoService
  ) { }

  ngOnInit() {
    this.telefonos = new Array();
    this.complejo_id = this.route.snapshot.params['complejo_id'];
    if (!this.complejo_id) {
      this.toaster.warning('No se especificó el id del complejo');
      this.router.navigate(['/configuracion/complejos']);
      return;
    }
    this.obtenerDetalleComplejo();
  }

  obtenerDetalleComplejo() {
    if (!this.complejo_id) {
      return;
    }
    this.loading = true;
    this.complejoService.obtenerComplejo(this.complejo_id).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.complejo = response.body;
        this.telefonos = this.complejo.telefonos;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
        this.router.navigate(['/configuracion/complejos']);
      }
    );
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  ponerModoEdicion() {
    this.editing = true;
  }

  agregarEspacioTelefono() {
    this.telefonos.push('');
  }

  removerTelefono(index: number) {
    this.telefonos.splice(index, 1);
  }

  editarComplejo() {
    if (!this.complejo.nombre || !this.complejo.direccion) {
      this.toaster.error('Es obligatorio poner un nombre y una dirección');
      return;
    }
    this.loading = true;
    this.complejo.telefonos = this.telefonos;
    this.complejoService.editarComplejo(this.complejo_id, this.complejo).subscribe(
      (response: HttpResponse<Complejo>) => {
        this.loading = false;
        this.editing = false;
        this.complejo = response.body;
        this.telefonos = this.complejo.telefonos;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

  borrarComplejo() {
    this.loading = true;
    this.complejoService.borrarComplejo(this.complejo_id).subscribe(
      (response: HttpResponse<any>) => {
        this.loading = false;
        this.editing = false;
        this.toaster.success('Complejo Borrado');
        this.router.navigate(['/configuracion/complejos']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error(error.status + ' error: ' + error.error.message);
      }
    );
  }

}
