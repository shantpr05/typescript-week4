
import { z } from "zod";

export const BookTitleSchema = z.enum([
  "dune",
  "neuromancer",
  "foundation",
]);

export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

export type Book = z.infer<typeof BookSchema>;

export const LoanSchema = z.object({
  loanId: z.number().int().positive(),
  title: BookTitleSchema,
  memberId: z.number().int().positive(),
});

export type Loan = z.infer<typeof LoanSchema>;

const books: Book[] = [
  { title: "dune", copiesAvailable: 3 },
  { title: "neuromancer", copiesAvailable: 2 },
  { title: "foundation", copiesAvailable: 0 },
];

export function findBook(title: unknown): Book {
  const validTitle = BookTitleSchema.parse(title);

  const book = books.find((book) => book.title === validTitle);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}


export function checkOutBook(book: unknown): number {
  const validBook = BookSchema.parse(book);

  if (validBook.copiesAvailable === 0) {
    throw new Error("No copies available");
  }

  return Math.floor(Math.random() * 9000) + 1000;
}

export function registerLoan(
  loanId: unknown,
  title: unknown,
  memberId: unknown,
): Loan {
  return LoanSchema.parse({
    loanId,
    title,
    memberId,
  });
}

export function borrowBook(title: unknown, memberId: unknown): Loan {
  const book = findBook(title);
  const loanId = checkOutBook(book);
  return registerLoan(loanId, title, memberId);
}