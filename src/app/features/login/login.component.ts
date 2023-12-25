import { Component, OnChanges, SimpleChanges, Input, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import RequestHandler from '../../shared/core/requestHandler';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [RequestHandler, ToastrService],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  show: boolean = true;

  _api_uri: string = 'http://localhost:3000/api';

  isLoggedIn: boolean = true;

  // private http = inject(HttpClient)

  constructor(
    private reqHandler: RequestHandler,
    private toastr: ToastrService
  ) { }

  checkInputs(event: any) {
    if (event.target.id === 'login-card-username-input') {
      this.username = event.target.value;
    } else if (event.target.id === 'login-card-password-input') {
      this.password = event.target.value;
    }

    console.log(event.target.id);
    console.log(this.username + ' ' + this.password);

    this.show =
      this.username !== '' ? (this.password !== '' ? false : true) : true;
  }

  checkIfUserLoggedIn() {
    return this.isLoggedIn;
  }

  async login() {
    if (this.username != '' && this.password != '') {
      try {
        const data: any = await this.reqHandler.POST('/login', {
          username: this.username,
          password: this.password,
        });

        this.reqHandler.handleErrors(data);

        console.info(data);
        if(data.status !== 200) {
          throw new Error('Login failed')
        }

        this.toastr.success('You are logged in as ' + this.username, 'Logged in!', {
          timeOut: 3000,
        });
      } catch (error: any) {
        console.log(error);
        this.toastr.error(error, 'Error', {
          timeOut: 6000,
          tapToDismiss: true,
        });
      }
    }
  }
}
