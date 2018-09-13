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

  fecha_inicial: Date;
  fecha_final: Date;

  registros: Registro[];

  constructor(
    private registrosService: RegistrosService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
  }

  getResults() {
    if (this.fecha_inicial > this.fecha_final) {
      this.toaster.error('La fecha final debe ser posterior a la fecha inicial');
      return;
    }
    this.registrosService.getRegistros(this.fecha_inicial.toString(), this.fecha_final.toString()).subscribe(
      (response: HttpResponse<Registro[]>) => {
        this.registros = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.statusText + 'message: ' + error.message);
      }
    );
  }

}
