
import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
  },
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
