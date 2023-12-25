import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import RequestHandler from '../../shared/core/requestHandler';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageHandler } from '../../shared/core/localstorage.class';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-emailincomming',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './emailincomming.component.html',
  styleUrl: './emailincomming.component.css',
  providers: [RequestHandler, LocalStorageHandler]
})
export class EmailincommingComponent {

  constructor(
    private toastr: ToastrService,
    private reqHandler: RequestHandler,
    private _local: LocalStorageHandler
  ) { }

  ngOnInit(): void {
    this.fetchEmails()
  }

  constructEmailToken() {
    let token = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    token += '.';
    token += this._local.getItem('user_id');
    token += '.';
    token += Date.now();

    return token;
  }

  async fetchEmails() {

    const token = this.constructEmailToken();

    let data: any = await this.reqHandler.GET(`/mail/pw-forgot-send/${token}`)

    console.log(data)
  }



}
