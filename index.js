import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { pool } from "./db.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Library API!");
});



app.get("/books", async (req, res) => {
  const { genre, sortBy, order, search } = req.query;

  const allowedColumns = [
    "id",
    "title",
    "genre",
    "published_year",
  ];

  const sortColumn = allowedColumns.includes(sortBy)
    ? sortBy
    : "id";

  const sortOrder =
    order?.toLowerCase() === "desc" ? "DESC" : "ASC";

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

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

  query += ` ORDER BY ${sortColumn} ${sortOrder}`;

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
    console.error("Error searching books:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.get("/books/:id", async (req, res) => {
  const id = Number(req.params.id);

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
    console.error("Error fetching book:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.post("/books", async (req, res) => {
  const { title, genre, published_year } = req.body;

  // Validate input
  if (
    typeof title !== "string" ||
    title.trim() === ""
  ) {
    return res.status(400).json({
      message: "Title is required and must be a non-empty string",
    });
  }

  if (
    genre !== undefined &&
    genre !== null &&
    typeof genre !== "string"
  ) {
    return res.status(400).json({
      message: "Genre must be a string",
    });
  }

  if (
    published_year !== undefined &&
    published_year !== null &&
    (!Number.isInteger(published_year) ||
      published_year < 0)
  ) {
    return res.status(400).json({
      message: "Published year must be a non-negative integer",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (title, genre, published_year)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        title.trim(),
        genre ?? null,
        published_year ?? null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating book:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, genre, published_year } = req.body;

  // Validate book ID
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid book ID",
    });
  }

  // Validate required title
  if (
    typeof title !== "string" ||
    title.trim() === ""
  ) {
    return res.status(400).json({
      message: "Title is required and must be a non-empty string",
    });
  }

  if (
    genre !== undefined &&
    genre !== null &&
    typeof genre !== "string"
  ) {
    return res.status(400).json({
      message: "Genre must be a string",
    });
  }

  if (
    published_year !== undefined &&
    published_year !== null &&
    (!Number.isInteger(published_year) ||
      published_year < 0)
  ) {
    return res.status(400).json({
      message: "Published year must be a non-negative integer",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET title = $1,
           genre = $2,
           published_year = $3
       WHERE id = $4
       RETURNING *`,
      [
        title.trim(),
        genre ?? null,
        published_year ?? null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating book:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.delete("/books/:id", async (req, res) => {
  const id = Number(req.params.id);

  // Validate book ID
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid book ID",
    });
  }

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
    console.error("Error deleting book:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.patch("/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, genre, published_year } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid book ID",
    });
  }

  const allowedFields = [
    "title",
    "genre",
    "published_year",
  ];

  const updates = [];
  const values = [];

  for (const field of allowedFields) {
    if (Object.hasOwn(req.body, field)) {
      const value = req.body[field];

      if (field === "title") {
        if (typeof value !== "string" || value.trim() === "") {
          return res.status(400).json({
            message: "Title must be a non-empty string",
          });
        }
        updates.push("title");
        values.push(value.trim());
      } else if (field === "genre") {
        if (value !== null && typeof value !== "string") {
          return res.status(400).json({
            message: "Genre must be a string or null",
          });
        }
        updates.push("genre");
        values.push(value);
      } else if (field === "published_year") {
        if (
          value !== null &&
          (!Number.isInteger(value) || value < 0)
        ) {
          return res.status(400).json({
            message: "Published year must be a non-negative integer or null",
          });
        }
        updates.push("published_year");
        values.push(value);
      }
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
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating book:", error.message);
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
    if (error.code === "23505") {
      return res.status(409).json({
        message: "This book is already on loan",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Member or book does not exist",
      });
    }

    console.error("Error creating loan:", error.message);
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
    console.error("Error returning book:", error.message);
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
    console.error("Error fetching statistics:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});