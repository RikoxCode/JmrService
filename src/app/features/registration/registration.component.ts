import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  password_check: string = '';
  email: string = '';

  show: boolean = true;

  constructor() {}

  checkInputs(event: any) {
    if (event.target.id === 'register-card-username-input') {
      this.username = event.target.value;
    } else if (event.target.id === 'register-card-password-input') {
      this.password = event.target.value;
    } else if (event.target.id === 'register-card-email-input') {
      this.email = event.target.value;
    }

    console.log(event.target.id);
    console.log(this.username + ' ' + this.password);

    this.show =
      this.username !== ''
        ? this.password !== ''
          ? this.email !== ''
            ? false
            : true
          : true
        : true;

    if (this.password !== this.password_check) {
      console.log('Passwords do not match!');
      this.show = true;
    }
  }

  checkPW(event: any) {
    this.password_check = event.target.value;
    this.show =
      this.username !== ''
        ? this.password !== ''
          ? this.email !== ''
            ? false
            : true
          : true
        : true;

    if (this.password !== this.password_check) {
      console.log('Passwords do not match!');
      this.show = true;
    }
  }

  register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      if (this.password === this.password_check) {
        console.log('Registering user...');
      }
    }
  }
}
