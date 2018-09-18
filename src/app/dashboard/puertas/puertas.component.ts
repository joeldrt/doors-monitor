import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Models
import { Registro } from './../../_models/registro';

// Services
import { RegistrosService } from './../../_services/registros.service';

import { ToasterService } from './../../_services/toaster.service';

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.component.html',
  styleUrls: ['./puertas.component.css']
})
export class PuertasComponent implements OnInit {

  loading = false;

  complejos = new Array();
  complejo_seleccionado = '';

  habitaciones = new Array();
  TODAS_LAS_HABITACIONES = 'TODAS';
  habitacion_seleccionada = '';

  fecha_inicial: Date;
  fecha_final: Date;

  ABIERTO = 'ABIERTO';
  CERRADO = 'CERRADO';

  registros: Registro[];

  constructor(
    private registrosService: RegistrosService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.registrosService.obtenerComplejos().subscribe(
      (response: HttpResponse<String[]>) => {
        this.complejos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error('Error: No se pudo obtener la lista de complejos');
      }
    );
  }

  complejoChange(complejo: string) {
    this.complejo_seleccionado = complejo;
    this.registrosService.obtenerHabitaciones(this.complejo_seleccionado).subscribe(
      (response: HttpResponse<String[]>) => {
        this.habitaciones = response.body;
        this.habitacion_seleccionada = this.TODAS_LAS_HABITACIONES;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error('Error: No se pudo obtener la lista de habitaciones');
      }
    );
  }

  habitacionChange(habitacion: string) {
    this.habitacion_seleccionada = habitacion;
  }

  getResults() {
    if (this.fecha_inicial > this.fecha_final) {
      this.toaster.error('La fecha final debe ser posterior a la fecha inicial');
      return;
    }
    this.loading = true;
    this.registros = new Array();
    this.registrosService.getRegistros(this.fecha_inicial.toString(), this.fecha_final.toString(),
                                      this.complejo_seleccionado, this.habitacion_seleccionada).subscribe(
      (response: HttpResponse<Registro[]>) => {
        this.loading = false;
        this.registros = response.body;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toaster.error('status: ' + error.statusText + 'message: ' + error.message);
      }
    );
  }

  downloadExcel() {
    this.registrosService.downloadExcelFile(this.fecha_inicial.toString(), this.fecha_final.toString(),
                                            this.complejo_seleccionado, this.habitacion_seleccionada).subscribe(
      (result) => {
        this.downLoadFile(result, 'application/ms-excel', this.fecha_inicial.toString() + '_' +
        this.fecha_final.toString() + '_' + this.complejo_seleccionado + '_' + this.habitacion_seleccionada + '.xlsx');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.statusText + 'message: ' + error.message);
      }
    );
  }

  downLoadFile(data: any, type: string, file_name: string) {
    const blob: Blob = new Blob([data], {type: type});
    const fileName = file_name;
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }
}
