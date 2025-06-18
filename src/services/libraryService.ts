import { books as bookData } from "../data/books";
import { Book } from "../models/book";
import { Rental } from "../models/rental";
import { v4 as uuidv4 } from "uuid";

const books: Book[] = bookData.map((book) => ({
  ...book,
  availableCopies: book.totalCopies,
}));

const rentals: Rental[] = [];

export const getAllBooks = () => books;

export const getBookByIsbn = (isbn: string) =>
  books.find((book) => book.isbn === isbn);

export const rentBook = (isbn: string, userId: string): Rental | null => {
  const book = getBookByIsbn(isbn);
  if (!book || book.availableCopies < 1) return null;

  book.availableCopies -= 1;
  const rental: Rental = {
    rentalId: uuidv4(),
    userId,
    bookIsbn: isbn,
    returned: false,
  };
  rentals.push(rental);
  return rental;
};

export const getUserRentals = (userId: string) =>
  rentals.filter((r) => r.userId === userId && !r.returned);

export const returnBook = (rentalId: string): boolean => {
  const rental = rentals.find((r) => r.rentalId === rentalId);
  if (!rental || rental.returned) return false;

  const book = getBookByIsbn(rental.bookIsbn);
  if (book) book.availableCopies += 1;
  rental.returned = true;
  return true;
};