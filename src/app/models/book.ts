import { Author } from "./author";

export class Book {
  id: number;
  title: string;
  authors: Array<Author>;
  pageCount: number;
  publishing?: string;
  publishingYear: number;
  releaseDate: string;
  isbn: string;
  image?: string;
}
