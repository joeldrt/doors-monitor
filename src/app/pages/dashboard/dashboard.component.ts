import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

// Services
import { RegistrosService } from './../../_services/registros.service';

// Models
import { Registro } from './../../_models/registro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registros: Registro[];

  constructor(
    private registroService: RegistrosService
  ) {
    this.registros = new Array<Registro>();
  }

  ngOnInit() {
    this.registroService.getRegistros().subscribe(
      (response: HttpResponse<Registro[]>) => {
        this.registros = response.body;
      }
    );
  }

}
