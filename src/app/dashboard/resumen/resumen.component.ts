import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Complejo } from '../../_models/complejo';
import { ComplejoService } from '../../_services/complejo.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  loading = false;
  complejos: Complejo[];

  constructor(
    private complejoService: ComplejoService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
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

}
