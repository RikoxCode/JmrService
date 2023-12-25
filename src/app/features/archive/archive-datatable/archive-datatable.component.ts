// archive-datatable.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IArchiveItem } from '../../../shared/Interfaces/IArchiveItem.interface';
import RequestHandler from '../../../shared/core/requestHandler';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import _helper from '../../../shared/core/helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-archive-datatable',
  templateUrl: './archive-datatable.component.html',
  styleUrls: ['./archive-datatable.component.css'],
  providers: [RequestHandler]
})
export class ArchiveDatatableComponent implements OnInit {
  // Beispiel:
  modal_item:{ [key: string]: any } = {};

  modal_item_id: string = '';

  @Input() items: IArchiveItem[] = [];

  // give the archive component the ability to reload the datatable
  @Output() reloadData = new EventEmitter<boolean>();

  isIllegalKeyWord: string[] = ['id', 'created_at', 'updated_at'];

  createInputFields: any = {
    "Titel": "insert value here",
    "Komponist": "insert value here",
    "Arrangeur": "insert value here",
    "Verlag": "insert value here",
    "Grad": "insert value here",
    "Flex":"insert value here" ,
    "Stil": "insert value here",
    "Duration": "insert value here",
    "Auffuehrungs_jahr": "insert value here",
    "Digital": "insert value here",
    "Demo_url": "insert value here",
    "Aufnahme_url": "insert value here",
    "Jmr_aufnahme_url": "insert value here",
    "Jungmusik_fest": "insert value here",
    "Bemerkungen": "insert value here",
  };

  filteredItems: any[] = [];
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  isSearchBarDisabled: boolean = false;

  constructor(
    private reqHandler: RequestHandler,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.filteredItems = [...this.items];
    this.sort('id');
  }


  /**
   * This function searches for the given string in the items array.
   * 
   * @param searchStr 
   */
  search(searchStr: string): void {
    this.filteredItems = this.items.filter((item) => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && !this.isIllegalKeyWord.includes(key)) {
          const element = item[key as keyof IArchiveItem]; // Add type assertion to access the property using string key
          if (element.toString().toLocaleUpperCase().includes(searchStr.toLocaleUpperCase())) {
            return true;
          }
        }
      }
      return false;
    });
  }

  sort(column: string): void {
    this.filteredItems.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortOrder === 'asc') {
        return this.compareValues(valueA, valueB);
      } else {
        return this.compareValues(valueB, valueA);
      }
    });

    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  private compareValues(valueA: any, valueB: any): number {
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    } else {
      return String(valueA).localeCompare(String(valueB));
    }
  }

  private reloadDatatable(): void {
    _helper.sleep(1000);
    this.reloadData.emit(true);
  }

  private setModalVals(item: any): void {
    this.modal_item = {
      "id": item._id !== undefined ? String(item._id) : String(item.title),
      "Titel": item.title !== '' ? String(item.title) : null,
      "Komponist": item.komponist !== '' ? String(item.komponist) : null,
      "Arrangeur": item.arrangeur !== '' ? String(item.arrangeur) : null,
      "Verlag": item.verlag !== '' ? String(item.verlag) : null,
      "Grad": String(item.grad) !== '' ? String(item.grad) : null,
      "Flex": String(item.flex) !== '' ? String(item.flex) : null,
      "Stil": item.stil !== '' ? String(item.stil) : null,
      "Duration": item.duration !== '' ? String(item.duration) : null,
      "Auffuehrungs_jahr":
        item.auffuehrungs_jahr !== '' ? String(item.auffuehrungs_jahr) : null,
      "Digital": item.digital_analog !== '' ? String(item.digital_analog) : null,
      "Demo_url": item.demo_url !== '' ? String(item.demo_url) : null,
      "Aufnahme_url": item.aufnahme_url !== '' ? String(item.aufnahme_url) : null,
      "Jmr_aufnahme_url":
        item.jmr_aufnahme_url !== '' ? String(item.jmr_aufnahme_url) : null,
      "Jungmusik_fest":
        String(item.jungmusik_fest) !== '' ? String(item.jungmusik_fest) : null,
      "Bemerkungen": item.bemerkungen !== '' ? String(item.bemerkungen) : null,
    };
  }

  openDetailModal(item: any): void {
    this.setModalVals(item);
    const detailModal = document.getElementById(
      'detailModal'
    ) as HTMLDialogElement;
    if (detailModal) {
      detailModal.show();
    } else {
      console.error('Das Detail-Modal wurde nicht gefunden.');
    }
  }

  createItemModal(): void {
    const createModal = document.getElementById(
      'createModal'
    ) as HTMLDialogElement;
    if (createModal) {
      createModal.show();
    } else {
      console.error('Das Create-Modal wurde nicht gefunden.');
    }
  }

  toggleSearch(): void {
    this.isSearchBarDisabled = !this.isSearchBarDisabled;
  }

  createExecute(): void {
    this.reqHandler.POST('/notemeta', this.modal_item);
  }

  editItemModal(item: any): void {
    const editModal = document.getElementById('editModal') as HTMLDialogElement;
    if (editModal) {
      editModal.show();
    } else {
      console.error('Das Edit-Modal wurde nicht gefunden.');
    }
  }

  editExecute(): void {
    this.reqHandler.PUT('/notemeta/' + this.modal_item['id'], this.modal_item);
  }

  deleteItemModal(item: any): void {
    const deleteModal = document.getElementById(
      'deleteModal'
    ) as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.show();
    } else {
      console.error('Das Delete-Modal wurde nicht gefunden.');
    }
  }

  async deleteExecute(id: string) {
    const data: any = await this.reqHandler.DELETE('/notemeta/' + id, {
      reloadCustomDatatable: true,
      logMessage: true,
    });

    this.toastr.info('You deleted 1 Item', 'Deletion', {
      timeOut: 4000,
    });

    this.filteredItems = data.reloadData;
  }

  checkInputs(event: any) {
    this.search(event.target.value);
  }

  clearInput(): void {
    const input = document.getElementsByTagName("input")[0];
    input.value = "";
  }
}