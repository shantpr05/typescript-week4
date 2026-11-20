
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
