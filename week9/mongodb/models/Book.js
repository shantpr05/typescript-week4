
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },

    genre: {
      type: String,
      enum: ["fantasy", "dystopian", "children", "classic"],
    },

    publishedYear: {
      type: Number,
      min: [0, "Published year cannot be negative"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
