import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from "../services/storage/storage.service";
import { Book } from "../models/book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  getAuthors() {
    let authors = '';
    this.book.authors.forEach((author, index) => {
      authors += author.name + ' ' + author.lastName;
      if (index < this.book.authors.length - 1) {
        authors += ', ';
      }
    });
    return authors;
  }

  removeBook() {
    this.storageService.removeBook(this.book);
    this.remove.emit();
  }
}
