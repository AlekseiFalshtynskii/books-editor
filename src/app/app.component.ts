import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { StorageService } from "./services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http,
              private storageService: StorageService) {
    if (!this.storageService.getBooks().length) {
      this.http.get("../../assets/stub/books.json").subscribe(
        ok => {
          this.storageService.saveBooks(ok.json());
        }
      );
      this.storageService.removeSorting();
    }
  }
}
