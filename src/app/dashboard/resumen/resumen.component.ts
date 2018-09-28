import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ComplejoService } from '../../_services/complejo.service';

import { ResumenGeneral } from './../../_models/resumen_general';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  HOY: number = Date.now();
  HOY_SERVICIO = '2018-09-27';
  FECHA_INICIAL = this.HOY_SERVICIO;
  FECHA_FINAL = this.HOY_SERVICIO;

  resumen_general: ResumenGeneral;

  constructor(
    private complejoService: ComplejoService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.HOY_SERVICIO = this.datePipe.transform(this.HOY, 'yyyy-MM-dd');
    this.FECHA_INICIAL = this.HOY_SERVICIO;
    this.FECHA_FINAL = this.HOY_SERVICIO;
    this.obtenerResumenGeneral();
  }

  inicializarMapas() {
    this.resumen_general = undefined;
  }

  obtenerResumenGeneral() {
    this.inicializarMapas();
    this.complejoService.obtenerResumenGeneral(this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
      (response: HttpResponse<any>) => {
        this.resumen_general = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
      }
    );
  }

  actualizarElNumeroDeServicios() {
    this.obtenerResumenGeneral();
  }

}
