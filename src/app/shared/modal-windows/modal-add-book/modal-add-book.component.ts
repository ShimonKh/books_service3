import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Book} from "../../models/books.models";
import {LocalStorageService} from "../../services/localStorage.service";

@Component({
  selector: 'app-modal-add-book',
  templateUrl: './modal-add-book.component.html',
  styleUrls: ['./modal-add-book.component.css']
})
export class ModalAddBookComponent implements OnInit {
  AUTHOR_MAX_LENGTH = 120;
  TITLE_MAX_LENGTH = 120;
  form: FormGroup;
  public modalRef: BsModalRef;
  title = 'Add book';
  editBook = false;
  book: Book;
  @ViewChild('template') template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'author': new FormControl(null, [Validators.required, Validators.maxLength(this.AUTHOR_MAX_LENGTH)]),
      'title': new FormControl(null, [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)], this.forbiddenTitles.bind(this)),
      'date': new FormControl(null, [Validators.required])
    });
  }

  public openModal(book) {
    if (book) {
      this.form = new FormGroup({
        'author': new FormControl(book.author, [Validators.required, Validators.maxLength(this.AUTHOR_MAX_LENGTH)]),
        'title': new FormControl(book.title, [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)], this.forbiddenTitles.bind(this)),
        'date': new FormControl(book.date, [Validators.required])
      });
      this.book = book;
      this.title = 'Edit book';
      this.editBook = true;
    }
    else {
      this.form.reset();
      this.title = 'Add book';
      this.editBook = false;
    }
    this.modalRef = this.modalService.show(this.template);
  }

  onSubmit() {
    const {author, title, date} = this.form.value;

    if (this.editBook) {
      const editedBook = new Book(author, title, date, this.book.id);
      this.localStorageService.editBook(editedBook)
    }
    else {
      const newBook = new Book(author, title, date);
      this.localStorageService.addBookLocally(newBook);
    }
    this.modalRef.hide();
    this.form.reset();
  }

  forbiddenTitles(control: FormControl) {
    return new Promise((req, res) => {
      if (this.ifBookExist(control.value)) {
        req({forbidden: true})
      }
      else {
        req(null);
      }
    });
  }

  ifBookExist(title) {
    if (this.book) {
      return this.book.title !== title && this.localStorageService.getBooksFromLocalStorage().find((obj) => obj.title === title);
    }
    else
      return this.localStorageService.getBooksFromLocalStorage().find((obj) => obj.title === title);
  }
}
