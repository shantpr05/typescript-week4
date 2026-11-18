import sequelize from "./sequelize.js";
import { Op, type WhereOptions } from "sequelize";
import Book from "./models/Book.js";
import Author from "./models/Author.js";
import Member from "./models/Member.js";
import Loan from "./models/Loan.js";
import "dotenv/config";
import { env } from "./env.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import {
  bookIdSchema,
  bookQuerySchema,
  bookSchema,
} from "./schemas.js";
import { z } from "zod";
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
Author.hasMany(Book, {
  foreignKey: "author_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

Member.belongsToMany(Book, {
  through: Loan,
  foreignKey: "member_id",
  otherKey: "book_id",
});

Book.belongsToMany(Member, {
  through: Loan,
  foreignKey: "book_id",
  otherKey: "member_id",
});

Loan.belongsTo(Member, {
  foreignKey: "member_id",
});

Loan.belongsTo(Book, {
  foreignKey: "book_id",
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Library API!");
});

app.get("/books", async (req, res) => {
  const queryValidation = bookQuerySchema.safeParse(req.query);

  if (!queryValidation.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
      errors: queryValidation.error.issues,
    });
  }

  const {
    genre,
    search,
    sort,
    page,
    limit,
  } = queryValidation.data;

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
  ) {
    return res.status(400).json({
      message: "Page must be positive and limit must be between 1 and 100",
    });
  }

  try {
    const where: WhereOptions = {};

    if (genre) {
      where.genre = genre;
    }

    if (search) {
      where.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const books = await Book.findAll({
      where,
      include: Author,
      order: [[sort, "ASC"]],
      limit,
      offset: (page - 1) * limit,
    });

    res.status(200).json({
      page,
      limit,
      books,
    });
  } catch (error) {
    console.error(
      "Error searching books:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/books/:id", async (req, res) => {
  const idValidation = bookIdSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Invalid book ID",
      errors: idValidation.error.issues,
    });
  }

  const { id } = idValidation.data;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(
      "Error fetching book:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/books", async (req, res) => {
  const validation = bookSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid book data",
      errors: validation.error.issues,
    });
  }

  const { title, genre, published_year } = validation.data;

  try {
    const book = await Book.create({
      title: title.trim(),
      genre,
      published_year,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(
      "Error creating book:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/books/:id", async (req, res) => {

  const idValidation = bookIdSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Invalid book ID",
      errors: idValidation.error.issues,
    });
  }

  const id = idValidation.data.id;

  const validation = bookSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid book data",
      errors: validation.error.issues,
    });
  }

  const { title, genre, published_year } = validation.data;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.update({
      title,
      genre,
      published_year,
    });

    return res.status(200).json(book);
  } catch (error) {
    console.error(
      "Error updating book:",
      error instanceof Error ? error.message : error,
    );

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.delete("/books/:id", async (req, res) => {
  const idValidation = bookIdSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Invalid book ID",
      errors: idValidation.error.issues,
    });
  }

  const { id } = idValidation.data;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.destroy();

    res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    console.error("Full DELETE error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.patch("/books/:id", async (req, res) => {
  const idValidation = bookIdSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Invalid book ID",
      errors: idValidation.error.issues,
    });
  }

  const id = idValidation.data.id;

  const patchBookSchema = bookSchema.partial().extend({
    genre: z.string().nullable().optional(),
    published_year: z.coerce.number().int().nonnegative().nullable().optional(),
  });

  const bodyValidation = patchBookSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      message: "Invalid book data",
      errors: bodyValidation.error.issues,
    });
  }

  const allowedFields = ["title", "genre", "published_year"] as const;
  const updates: string[] = [];
  const values: unknown[] = [];
  const data = bodyValidation.data;

  for (const field of allowedFields) {
    if (Object.hasOwn(data, field)) {
      updates.push(field);
      const value = data[field];

      values.push(
        field === "title" && typeof value === "string"
          ? value.trim()
          : value,
      );
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({
      message: "Provide at least one valid field to update",
    });
  }


  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const updateData = {
      ...data,
      ...(typeof data.title === "string"
        ? { title: data.title.trim() }
        : {}),
    };

    await book.update(updateData);

    res.status(200).json(book);
  } catch (error) {
    console.error(
      "Error updating book:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.post("/loans", async (req, res) => {
  const { member_id, book_id } = req.body;

  if (
    !Number.isInteger(member_id) ||
    member_id <= 0 ||
    !Number.isInteger(book_id) ||
    book_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid member_id and book_id are required",
    });
  }

  try {
    // Check whether the member exists
    const member = await Member.findByPk(member_id);

    // Check whether the book exists
    const book = await Book.findByPk(book_id);

    if (!member || !book) {
      return res.status(400).json({
        message: "Member or book does not exist",
      });
    }

    // Check whether this book already has an active loan
    const existingLoan = await Loan.findOne({
      where: {
        book_id,
        returned_at: null,
      },
    });

    if (existingLoan) {
      return res.status(409).json({
        message: "This book is already on loan",
      });
    }

    // Create a new loan
    const loan = await Loan.create({
      member_id,
      book_id,
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error(
      "Error creating loan:",
      error instanceof Error ? error.message : error
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});




app.patch("/loans/:id/return", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid loan ID",
    });
  }

  try {
    const loan = await Loan.findOne({
      where: {
        id,
        returned_at: null,
      },
    });

    if (!loan) {
      return res.status(404).json({
        message: "Active loan not found",
      });
    }

    await loan.update({
      returned_at: new Date(),
    });

    res.status(200).json({
      message: "Book returned successfully",
      loan,
    });
  } catch (error) {
    console.error(
      "Error returning book:",
      error instanceof Error ? error.message : error
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/stats", async (req, res) => {
  try {
    const stats = await Book.findOne({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "total_books"],
        [
          sequelize.fn("COUNT", sequelize.fn("DISTINCT", sequelize.col("genre"))),
          "total_genres",
        ],
        [
          sequelize.fn("MIN", sequelize.col("published_year")),
          "oldest_publication_year",
        ],
        [
          sequelize.fn("MAX", sequelize.col("published_year")),
          "newest_publication_year",
        ],
      ],
      raw: true,
    });

    res.status(200).json(stats);
  } catch (error) {
    console.error(
      "Error fetching statistics:",
      error instanceof Error ? error.message : error
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

testDatabaseConnection();
async function testBookModel() {
  try {
    const books = await Book.findAll();

    console.log("Books fetched successfully:");
    console.log(books.map((book) => book.toJSON()));
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
testBookModel();


app.get("/authors/:id/books", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: Book,
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error("Error fetching author's books:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.get("/members/:id/loans", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          through: {
            attributes: ["borrowed_at", "returned_at"],
          },
        },
      ],
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member loans:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});