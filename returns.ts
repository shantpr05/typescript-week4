import { z } from "zod";

export const LoanSchema = z.object({
  loanId: z.number().int().positive(),
  title: z.string(),
  memberId: z.number().int().positive(),
});

type Loan = z.infer<typeof LoanSchema>;

const activeLoans: Loan[] = [
  { loanId: 1001, title: "dune", memberId: 7 },
  { loanId: 1002, title: "neuromancer", memberId: 8 },
];

export function findLoan(loanId: unknown): Loan {
  const validId = z.number().int().positive().parse(loanId);

  const loan = activeLoans.find((loan) => loan.loanId === validId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  return {
    loanId: loan.loanId,
    title: loan.title,
    memberId: loan.memberId,
  };
}

export function markReturned(loan: unknown) {
  const validLoan = LoanSchema.parse(loan);

  return {
    ...validLoan,
    returned: true,
  };
}

export function returnBook(loanId: unknown) {
  const loan = findLoan(loanId);
  return markReturned(loan);
}