import { Injectable } from '@angular/core';
import { Author } from "../../models/author";
import { Book } from "../../models/book";
import * as moment from 'moment';

@Injectable()
export class ValidationService {

  constructor() { }

  public validateBook(book: Book) {
    let errors = [];
    if (!book.title) {
      errors.push('Заполните поле "Наименование"');
    }
    if (!book.authors || !book.authors.length) {
      errors.push('Добавьте хотя бы одного автора');
    }
    if (!book.pageCount) {
      errors.push('Заполните поле "Число страниц"');
    } else if (book.pageCount > 10000) {
      errors.push('"Число страниц" должно быть не больше 10000');
    }
    if (!book.publishingYear) {
      errors.push('Заполните поле "Год публикации"');
    } else if (book.publishingYear < 1800) {
      errors.push('"Год публикации" должен быть больше 1800');
    }
    if (!book.releaseDate) {
      errors.push('Заполните поле "Дата выхода в тираж"');
    } else if (!moment(book.releaseDate, 'DD.MM.YYYY').valueOf()) {
      errors.push('Поле "Дата выхода в тираж" должно быть заполнено в формате "ДД.ММ.ГГГГ"');
    } else if (moment(book.releaseDate, 'DD.MM.YYYY').valueOf() < new Date(1800, 0, 1).valueOf()) {
      errors.push('"Дата выхода в тираж" должна быть больше "01.01.1800"');
    }
    if (!book.isbn) {
      errors.push('Поле "ISBN" должно быть заполнено');
    } else if (String(book.isbn).replace(/-/g, '').length != 10 && String(book.isbn).replace(/-/g, '').length != 13) {
      errors.push('Поле "ISBN" должно содержать 10 или 13 цифр');
    } else {
      let digits = String(book.isbn).replace(/-/g, '').split('');
      let s = 0;
      if (digits.length == 10) {
        let k = 10;
        for (let i = 0; i < 9; i++) {
          s += parseInt(digits[i]) * k--;
        }
        s = (11 - s % 11) % 11;
        if (s != parseInt(digits[9])) {
          errors.push('Поле "ISBN" содержит некорректное значение');
        }
      } else {
        let k;
        for (let i = 0; i < 12; i++) {
          if (i % 2 == 0) {
            k = 1;
          } else {
            k = 3;
          }
          s += parseInt(digits[i]) * k;
        }
        s = 10 - s % 10;
        if (!((s == 10 && parseInt(digits[12]) == 0) || (s == parseInt(digits[12])))) {
          errors.push('Поле "ISBN" содержит некорректное значение');
        }
      }
    }
    if (errors.length) {
      throw Error(this.getErrorMessage(errors));
    }
  }

  public validateAuthor(author: Author) {
    let errors = [];
    if (!author.name) {
      errors.push('Заполните поле "Имя автора"');
    }
    if (!author.lastName) {
      errors.push('Заполните поле "Фамилия автора"');
    }
    if (errors.length) {
      throw Error(this.getErrorMessage(errors));
    }
  }

  private getErrorMessage(errors: Array<string>): string {
    let result = '';
    errors.forEach(error => {
      result += error + '\r\n';
    });
    return result;
  }
}
