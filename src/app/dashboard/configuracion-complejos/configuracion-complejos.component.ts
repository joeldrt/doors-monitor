import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion-complejos',
  templateUrl: './configuracion-complejos.component.html',
  styleUrls: ['./configuracion-complejos.component.css']
})
export class ConfiguracionComplejosComponent implements OnInit {

  loading = false;
  complejos: Complejo[];

  complejo_a_agregar: Complejo;

  constructor(
    private complejoService: ComplejoService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.complejo_a_agregar = new Complejo();
    this.cargarComplejos();
  }

  cargarComplejos() {
    this.loading = true;
    this.complejoService.obtenerComplejos().subscribe(
      (response: HttpResponse<Complejo[]>) => {
        this.complejos = response.body;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
        this.loading = false;
      }
    );
  }

  guardarComplejo() {
    if (!this.complejo_a_agregar || !this.complejo_a_agregar.nombre || !this.complejo_a_agregar.direccion) {
      this.toaster.warning('deben llenarse todos los campos');
      return;
    }
    this.loading = true;
    this.complejoService.guardarComplejo(this.complejo_a_agregar).subscribe(
      (response: HttpResponse<Complejo>) => {
        if (!response.body.id) {
          this.toaster.error('Error del servidor, no devolvió id del documento');
          this.loading = false;
          return;
        }
        this.toaster.success('Complejo ' + response.body.nombre + ' guardado');
        this.complejo_a_agregar = new Complejo();
        this.cargarComplejos();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        this.loading = false;
      }
    );
  }

}
