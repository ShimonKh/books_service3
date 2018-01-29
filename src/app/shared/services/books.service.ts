import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Book} from "../models/books.models";

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get("./assets/dbBooks.json").
      map((books) => books['books']);
  }

}
