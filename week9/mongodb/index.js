
import express from "express";
import "./db.js";
import Book from "./models/Book.js";
import Author from "./models/Author.js";
import Member from "./models/Member.js";
import Loan from "./models/Loan.js";
import MemberEmbedded from "./models/MemberEmbedded.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Library API is running!",
  });
});


// GET all books

app.get("/books", async (req, res) => {
  try {
    const {
      genre,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter
    const filter = {};

    if (genre) {
      filter.genre = genre;
    }

    // Pagination
    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const skip = (currentPage - 1) * pageLimit;

    // Sorting
    const sortOption = {};

    if (sort === "publishedYear") {
      sortOption.publishedYear = 1;
    }

    // Fetch books
    const books = await Book.find(filter)
      .populate("author")
      .sort(sortOption)
      .limit(pageLimit)
      .skip(skip);

    // Count matching books
    const total = await Book.countDocuments(filter);

    res.status(200).json({
      page: currentPage,
      limit: pageLimit,
      total,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// POST a new book
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
app.post("/authors", async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();

    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/authors/:id/books", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        error: "Author not found",
      });
    }

    const books = await Book.find({
      author: req.params.id,
    }).populate("author");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/members", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();

    res.status(201).json(savedMember);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/loans", async (req, res) => {
  try {
    const { book, member } = req.body;

    // Check whether the book exists
    const existingBook = await Book.findById(book);

    if (!existingBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    // Check whether the member exists
    const existingMember = await Member.findById(member);

    if (!existingMember) {
      return res.status(404).json({
        error: "Member not found",
      });
    }

    // Check whether the book already has an active loan
    const activeLoan = await Loan.findOne({
      book,
      returnedAt: { $exists: false },
    });

    if (activeLoan) {
      return res.status(409).json({
        error: "This book is already borrowed",
      });
    }

    // Create the loan
    const newLoan = new Loan({
      book,
      member,
    });

    const savedLoan = await newLoan.save();

    res.status(201).json(savedLoan);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


app.patch("/loans/:id/return", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        error: "Loan not found",
      });
    }

    if (loan.returnedAt) {
      return res.status(400).json({
        error: "Book has already been returned",
      });
    }

    loan.returnedAt = new Date();

    const updatedLoan = await loan.save();

    res.status(200).json(updatedLoan);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid loan ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/members/:id/loans", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        error: "Member not found",
      });
    }

    const loans = await Loan.find({
      member: req.params.id,
    }).populate("book");

    res.status(200).json(loans);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid member ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/stats/genres", async (req, res) => {
  try {
    const stats = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          totalBooks: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/stats/top-authors", async (req, res) => {
  try {
    const stats = await Book.aggregate([
      {
        $match: {
          author: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: "$author",
          totalBooks: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalBooks: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const populatedStats = await Author.populate(stats, {
      path: "_id",
      select: "name",
    });

    res.status(200).json(
      populatedStats.map((item) => ({
        author: item._id,
        totalBooks: item.totalBooks,
      }))
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/members-embedded", async (req, res) => {
  try {
    const newMember = new MemberEmbedded(req.body);

    const savedMember = await newMember.save();

    res.status(201).json(savedMember);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


app.get("/members-embedded/:id", async (req, res) => {
  try {
    const member = await MemberEmbedded.findById(req.params.id)
      .populate("loans.book");

    if (!member) {
      return res.status(404).json({
        error: "Member not found",
      });
    }

    res.status(200).json(member);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid member ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
