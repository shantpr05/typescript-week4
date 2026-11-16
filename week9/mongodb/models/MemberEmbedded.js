
import mongoose from "mongoose";

const embeddedLoanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
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

const memberEmbeddedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  loans: [embeddedLoanSchema],
});

const MemberEmbedded = mongoose.model(
  "MemberEmbedded",
  memberEmbeddedSchema
);

export default MemberEmbedded;
