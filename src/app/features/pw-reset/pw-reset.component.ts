import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import RequestHandler from '../../shared/core/requestHandler';
import { LocalStorageHandler } from '../../shared/core/localstorage.class';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pw-reset',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pw-reset.component.html',
  styleUrl: './pw-reset.component.css',
  providers: [RequestHandler, LocalStorageHandler],
})
export class PwResetComponent {
  show = false;

  passwords: any = {
    password_old: false,
    password_new: false,
    password_new_repeat: false,
  };

  constructor(
    private toastr: ToastrService,
    private reqHandler: RequestHandler,
    private _local: LocalStorageHandler
  ) {}

  checkInputs(event: any) {
    if (event.target.id === 'login-card-old-password-input') {
      this.passwords.password_old = event.target.value;
    } else if (event.target.id === 'login-card-new-password-input') {
      this.passwords.password_new = event.target.value;
    } else if (event.target.id === 'login-card-new-password-input-second') {
      this.passwords.password_new_repeat = event.target.value;
    }

    if (
      this.passwords.password_old &&
      this.passwords.password_new &&
      this.passwords.password_new_repeat
    ) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  changePW() {
    if (this.passwords.password_new !== this.passwords.password_new_repeat) {
      this.toastr.error('Die Passwörter stimmen nicht überein!', 'Fehler');
      return;
    }

    const uuid: any = this._local.getItem('user_id');

    this.reqHandler.PUT(`/user/${uuid}/pw-reset`, {
      password_old: this.passwords.password_old,
      password_new: this.passwords.password_new,
    });

    this.toastr.success('Passwort erfolgreich geändert!', 'Erfolg');
  }
}
