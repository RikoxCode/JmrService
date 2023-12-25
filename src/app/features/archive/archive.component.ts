import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IArchiveItem } from '../../shared/Interfaces/IArchiveItem.interface';
import { ArchiveDatatableComponent } from './archive-datatable/archive-datatable.component';
import { ToastrService } from 'ngx-toastr';
import RequestHandler from '../../shared/core/requestHandler';
import { LoginComponent } from '../login/login.component';
import { NotLoggedInComponent } from '../login/not-logged-in/not-logged-in.component';
import _helper from '../../shared/core/helper';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ArchiveDatatableComponent, NotLoggedInComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css',
  providers: [RequestHandler, LoginComponent]
})
export class ArchiveComponent implements OnInit {
  archive_items: any = [];

  isLoggedIn: boolean = this.LoginHandler.isLoggedIn;

  isRequested: boolean = false;

  constructor(
    private ReqHandler: RequestHandler,
    private LoginHandler: LoginComponent
  ){}

  ngOnInit(): void {
    this.fetchArchiveItems()
  }

  reloadData($event: any) {
    _helper.sleep(1000)
    this.fetchArchiveItems()
  }

  async fetchArchiveItems() {
    this.isRequested = false
    
    let data: any = await this.ReqHandler.GET('/notemeta')

    this.ReqHandler.handleErrors(data)

    data = this.validateArchiveItems(data)

    this.archive_items = data

    this.isRequested = true
  }

  validateArchiveItems(items: any[]) {
    items.forEach(element => {
      // go through each key of the element and check if it is valid
      // if not, change value to "not set"
      Object.keys(element).forEach(key => {
        if (element[key] === null || element[key] === undefined || element[key] === 'undefiend') {
          element[key] = 'not set'
        }
        if(element[key] !== Number) {
          element[key] = element[key].toString()
        }
      });
    });

    return items
  }
}
