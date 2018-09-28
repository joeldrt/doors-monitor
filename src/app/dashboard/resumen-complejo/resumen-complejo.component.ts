import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { ResumenComplejo } from '../../_models/resumen_complejo';

import { TIPOS_HABITACION } from '../../_models/habitacion';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen-complejo',
  templateUrl: './resumen-complejo.component.html',
  styleUrls: ['./resumen-complejo.component.css']
})
export class ResumenComplejoComponent implements OnInit {

  HOY: number = Date.now();
  HOY_SERVICIO = '2018-09-27';
  FECHA_INICIAL = this.HOY_SERVICIO;
  FECHA_FINAL = this.HOY_SERVICIO;
  tipos_habitacion = TIPOS_HABITACION;

  complejo_id: string;
  resumen_complejo: ResumenComplejo;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complejoService: ComplejoService,
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
    this.obtenerResumenPorComplejo();
  }

  inicializarMapas() {
    this.resumen_complejo = undefined;
  }

  obtenerResumenPorComplejo() {
    this.inicializarMapas();
    this.complejoService.obtenerServiciosComplejoEntreFechas(this.complejo_id, this.FECHA_INICIAL, this.FECHA_FINAL).subscribe(
      (response: HttpResponse<any>) => {
        this.resumen_complejo = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' error: ' + error.error.message);
        console.log(error);
      }
    );
  }

  actualizarElNumeroDeServicios() {
    this.obtenerResumenPorComplejo();
  }

  getColor(estado_habitacion: string) {
    if (estado_habitacion === 'Servicio') {
      return 'blue';
    }
    return 'gray';
  }

}
