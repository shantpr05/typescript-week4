import express from "express";
import { z } from "zod";
import { pool } from "../../src/db.js";

const app = express();

// Only allow approved product categories
const categorySchema = z.object({
  category: z.enum(["Gifts"]),
});

app.get("/products", async (req, res) => {
  const validation = categorySchema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid category",
      errors: validation.error.issues,
    });
  }

  const { category } = validation.data;

  try {
    // SAFE: $1 separates SQL code from user-supplied values.
    const result = await pool.query(
      `SELECT name, description
       FROM products
       WHERE category = $1        
       AND released = TRUE`,
      [category],
    );

    return res.json(result.rows);
  } catch {
    return res.status(500).json({
      message: "Database error",
    });
  }
});

export default app;

// Parameterized queries ($1) keep user input separate from SQL code.
// String concatenation is unsafe because malicious input can change the SQL query.

// ORDER BY column names cannot be parameterized using $1.
// Use a whitelist of allowed column names instead.