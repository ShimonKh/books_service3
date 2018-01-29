import {Component, OnInit} from '@angular/core';

import {BooksService} from "../shared/services/books.service";
import {Book} from "../shared/models/books.models";
import {LocalStorageService} from "../shared/services/localStorage.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    if (this.localStorageService.getBooksFromLocalStorage().length > 0) {
      this.books = this.localStorageService.getBooksFromLocalStorage();
    }

    else {
      this.booksService.getAllBooks()
        .subscribe((books: Book[]) => {
          this.localStorageService.saveBooksLocally(books);
          this.books = books;
        })
    }
  }
}
