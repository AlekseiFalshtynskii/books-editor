import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { StorageService } from "../services/storage/storage.service";
import { ValidationService } from "../services/validation/validation.service";
import { Book } from "../models/book";
import { Author } from "../models/author";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  private subscription: Subscription;
  book: Book = new Book();
  newAuthor: Author = new Author();
  image: File;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private storageService: StorageService,
              private validationService: ValidationService) {
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.book = this.storageService.getBook(params['id']);
      }
    });
  }

  addAuthor() {
    try {
      this.validationService.validateAuthor(this.newAuthor);
    } catch (e) {
      alert(e.message);
      return;
    }
    if (!Array.isArray(this.book.authors)) {
      this.book.authors = [];
    }
    const author = {};
    this.book.authors.push(Object.assign(author, this.newAuthor));
    delete(this.newAuthor.name);
    delete(this.newAuthor.lastName);
  }

  deleteAuthor(author) {
    this.book.authors.splice(this.book.authors.findIndex(search => {
      return search === author;
    }), 1);
  }

  getNowYear() {
    return new Date().getFullYear();
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.image = files[0];
    this.saveBase64Image(this.image);
  }

  saveBase64Image(file: File) {
    let reader = new FileReader();
    reader.onload = ((_file) => {
      return (e) => {
        this.book.image = 'data:' + this.image.type + ';base64,' + btoa(e.target.result);
        console.log(this.book.image);
      };
    })(file);
    reader.readAsBinaryString(file);
  }

  save() {
    try {
      this.validationService.validateBook(this.book);
    } catch (e) {
      alert(e.message);
      return;
    }
    if (this.book.id) {
      this.storageService.editBook(this.book);
    } else {
      this.storageService.addBook(this.book);
    }
    this.router.navigate(['/']);
  }
}
