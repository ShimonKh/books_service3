import {Book} from "../models/books.models";

export class LocalStorageService {
  books: Book[] = [];
  id = 10;

  saveBooksLocally(books: Book[]) {
    this.books = books;
  }

  getBooksFromLocalStorage() {
    return this.books;
  }

  clearLocalStorage() {
    this.books = [];
  }

  addBookLocally(book: Book) {
    book.id = ++this.id;
    this.books.push(book);
  }

  deleteBookLocally(book: Book) {
    this.books.splice(this.books.indexOf(book), 1);
  }

  editBook(book: Book) {
    let i = this.books.indexOf(this.books.find((obj) => (obj.id === book.id)));
    this.books.splice(i, 1, book);
  }
}

