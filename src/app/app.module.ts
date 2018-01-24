import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { OrderModule } from 'ngx-order-pipe';
import { StorageService } from "./services/storage/storage.service";
import { ValidationService } from "./services/validation/validation.service";

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { BooksListComponent } from './books-list/books-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookComponent } from './book/book.component';

const appRoutes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'book-edit', component: BookEditComponent },
  { path: 'book-edit/:id', component: BookEditComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookEditComponent,
    PageNotFoundComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    OrderModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    StorageService,
    ValidationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
