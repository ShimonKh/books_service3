import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap";

import {Book} from "../../models/books.models";
import {LocalStorageService} from "../../services/localStorage.service";

@Component({
  selector: 'app-modal-delete-book',
  templateUrl: './modal-delete-book.component.html',
  styleUrls: ['./modal-delete-book.component.css']
})
export class ModalDeleteBookComponent implements OnInit {
  public modalRef: BsModalRef;
  book: Book;
  @ViewChild('template') template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  public openModal(book) {
    this.book = book;
    this.modalRef = this.modalService.show(this.template, <ModalOptions>{class: 'modal-sm'});
  }

  deleteBook() {
    this.modalRef.hide();
    this.localStorageService.deleteBookLocally(this.book);
  }
}
