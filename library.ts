
import { z } from "zod";

export const BookTitleSchema = z.enum([
  "dune",
  "neuromancer",
  "foundation",
  "the-alchemist",
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

export const MemberSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  membership: z.enum(["basic", "premium"]),
  booksOnLoan: z.number().int().nonnegative(),
});

export type Member = z.infer<typeof MemberSchema>;

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

export function borrowLimit(membership: unknown): number {
  const validMembership = z.enum(["basic", "premium"]).parse(membership);

  return validMembership === "basic" ? 2 : 5;
}

export function canBorrow(member: unknown): boolean {
  const validMember = MemberSchema.parse(member);
  const limit = borrowLimit(validMember.membership);

  return validMember.booksOnLoan < limit;
}

export function borrowWithLimit(
  title: unknown,
  member: unknown,
): Loan {
  const validMember = MemberSchema.parse(member);

  if (!canBorrow(validMember)) {
    throw new Error("Borrowing limit reached");
  }

  return borrowBook(title, validMember.id);
}

export function borrowBooks(
  titles: unknown,
  member: unknown,
): Loan[] {
  const validTitles = z
    .array(BookTitleSchema)
    .min(1)
    .max(3)
    .parse(titles);

  const validMember = MemberSchema.parse(member);

  if (validMember.booksOnLoan + validTitles.length >
      borrowLimit(validMember.membership)) {
    throw new Error("Borrowing limit reached");
  }

  return validTitles.map((title) =>
    borrowWithLimit(title, {
      ...validMember,
      booksOnLoan: validMember.booksOnLoan +
        validTitles.indexOf(title),
    }),
  );
}