import { Injectable } from '@angular/core';
import { Book } from "../../models/book";

@Injectable()
export class StorageService {
  private LAST_ID: string = "last_id";
  private BOOKS: string = "books";
  private SORTING_BY_TITLE: string = "sorting_by_title";
  private SORTING_BY_PUBLISHING_YEAR: string = "sorting_by_publishing_year";

  constructor() {
    this.put(this.LAST_ID, '2'); // только для первоначальной загрузки заглушки
  }

  private get(key: string): string {
    return localStorage.getItem(key);
  }

  private put(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }

  private getActualId(): number {
    return parseInt(localStorage.getItem(this.LAST_ID)) + 1;
  }

  private saveLastId(id: number) {
    this.put(this.LAST_ID, String(id));
  }

  public saveBooks(books: Array<Book>) {
    this.put(this.BOOKS, JSON.stringify(books));
  }

  public getBooks(): Array<Book> {
    return this.get(this.BOOKS) ? JSON.parse(this.get(this.BOOKS)) : [];
  }

  public addBook(book: Book) {
    book.id = this.getActualId();
    let books = this.getBooks();
    books.push(book);
    this.saveBooks(books);
    this.saveLastId(book.id);
  }

  public editBook(book: Book) {
    let books = this.getBooks();
    let i = books.findIndex(_book => {
      return _book.id == book.id;
    });
    books[i] = book;
    this.saveBooks(books);
  }

  public removeBook(book: Book) {
    let books = this.getBooks();
    books.splice(books.findIndex(_book => {
      return _book.id == book.id;
    }), 1);
    this.saveBooks(books);
  }

  public getBook(id: number): Book {
    return this.getBooks().find(book => {
      return book.id == id;
    });
  }

  public getSortingByTitle(): string {
    return this.get(this.SORTING_BY_TITLE);
  }

  public changeSortingByTitle() {
    this.remove(this.SORTING_BY_PUBLISHING_YEAR);
    if (!this.get(this.SORTING_BY_TITLE) || this.get(this.SORTING_BY_TITLE) == 'UP') {
      this.put(this.SORTING_BY_TITLE, 'DOWN');
    } else {
      this.put(this.SORTING_BY_TITLE, 'UP');
    }
  }

  public getSortingByPublishingYear(): string {
    return this.get(this.SORTING_BY_PUBLISHING_YEAR);
  }

  public changeSortingByPublishingYear() {
    this.remove(this.SORTING_BY_TITLE);
    if (!this.get(this.SORTING_BY_PUBLISHING_YEAR) || this.get(this.SORTING_BY_PUBLISHING_YEAR) == 'UP') {
      this.put(this.SORTING_BY_PUBLISHING_YEAR, 'DOWN');
    } else {
      this.put(this.SORTING_BY_PUBLISHING_YEAR, 'UP');
    }
  }

  public removeSorting() {
    this.remove(this.SORTING_BY_TITLE);
    this.remove(this.SORTING_BY_PUBLISHING_YEAR);
  }
}
