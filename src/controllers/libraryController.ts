import { Request, Response } from "express";
import * as library from "../services/libraryService";

export const getBooks = (req: Request, res: Response): void => {
  res.json(library.getAllBooks());
};

export const getBook = (req: Request, res: Response): void => {
  const book = library.getBookByIsbn(req.params.bookId);
  if (!book) {
    res.status(404).send("Book not found");
    return;
  }
  res.json(book);
};

export const rent = (req: Request, res: Response): void => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).send("Missing userId");
    return;
  }

  const rental = library.rentBook(req.params.bookId, userId);
  if (!rental) {
    res.status(400).send("Book unavailable");
    return;
  }

  res.status(201).json(rental);
};

export const getUserBooks = (req: Request, res: Response): void => {
  const rentals = library.getUserRentals(req.params.userId);
  res.json(rentals);
};

export const returnBook = (req: Request, res: Response): void => {
  const success = library.returnBook(req.params.rentalId);
  if (!success) {
    res.status(400).send("Return failed");
    return;
  }
  res.status(200).send("Returned");
};