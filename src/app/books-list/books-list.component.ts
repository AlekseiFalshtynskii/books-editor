import { Component, OnInit } from '@angular/core';
import { StorageService } from "../services/storage/storage.service";
import { Book } from "../models/book";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Array<Book>;
  orderField: string;
  reverse: boolean;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.books = this.storageService.getBooks();
    this.sort();
  }

  updateBooks() {
    this.books = this.storageService.getBooks();
  }

  getArrowIcon(field: string): string {
    return field == this.orderField ? this.reverse ? 'arrow_drop_up' : 'arrow_drop_down' : '';
  }

  sort() {
    let sortingByTitle = this.storageService.getSortingByTitle();
    let sortingByPublishingYear = this.storageService.getSortingByPublishingYear();
    if (sortingByTitle) {
      this.orderField = 'title';
      this.reverse = sortingByTitle == 'UP';
    } else if (sortingByPublishingYear) {
      this.orderField = 'publishingYear';
      this.reverse = sortingByPublishingYear == 'UP';
    }
  }

  sortByTitle() {
    this.storageService.changeSortingByTitle();
    this.sort();
  }

  sortByPublishingYear() {
    this.storageService.changeSortingByPublishingYear();
    this.sort();
  }
}
