import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;

  email: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  performLogin() {
    if (!this.email || !this.password) {
      this.toaster.error('Deben llenarse ambos campos');
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        (data: HttpResponse<any>) => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        (error: HttpErrorResponse) => {
          this.toaster.error(error.status + ' message: ' + error.error.message);
          console.log(error);
          this.loading = false;
        });
  }

}
