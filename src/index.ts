import "dotenv/config";
import { env } from "./env.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { pool } from "./db.js";
import {
  bookIdSchema,
  bookQuerySchema,
  bookSchema,
} from "./schemas.js";
import { z } from "zod";

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
    page ,
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

  const conditions = [];
  const values = [];

  if (genre) {
    values.push(genre);
    conditions.push(`genre = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  let query = "SELECT * FROM books";

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY ${sort} ASC`;

  values.push(limit);
  query += ` LIMIT $${values.length}`;

  values.push((page - 1) * limit);
  query += ` OFFSET $${values.length}`;

  try {
    const result = await pool.query(query, values);

    res.status(200).json({
      page,
      limit,
      books: result.rows,
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

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid book ID",
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(
      "Error fetching book:",
      error instanceof Error ? error.message : error
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
    const result = await pool.query(
      `INSERT INTO books (title, genre, published_year)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title.trim(), genre, published_year],
    );

    res.status(201).json(result.rows[0]);
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
    const result = await pool.query(
      `UPDATE books
      SET title = $1,
          genre = $2,
          published_year = $3
      WHERE id = $4
      RETURNING *`,
      [title, genre, published_year, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(result.rows[0]);
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
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Error deleting book:",
      error instanceof Error ? error.message : error,
    );

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

  const setClause = updates
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(id);

  try {
    const result = await pool.query(
      `UPDATE books SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(result.rows[0]);
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
    const result = await pool.query(
      `INSERT INTO loans (member_id, book_id)
       VALUES ($1, $2)
       RETURNING *`,
      [member_id, book_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (
      typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "23505"
    ) {
      return res.status(409).json({
        message: "This book is already on loan",
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503"
    ) {
      return res.status(400).json({
        message: "Member or book does not exist",
      });
    }

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
    const result = await pool.query(
      `UPDATE loans
       SET returned_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND returned_at IS NULL
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Active loan not found",
      });
    }

    res.status(200).json({
      message: "Book returned successfully",
      loan: result.rows[0],
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
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_books,
        COUNT(DISTINCT genre)::int AS total_genres,
        MIN(published_year) AS oldest_publication_year,
        MAX(published_year) AS newest_publication_year
      FROM books
    `);

    res.status(200).json(result.rows[0]);
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


app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});