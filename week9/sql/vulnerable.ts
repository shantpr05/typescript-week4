import express from "express";
import { pool } from "../../src/db.js";

const app = express();

app.get("/products", async (req, res) => {
  // Intentionally vulnerable: never use this approach in production.
  const result = await pool.query(
    `SELECT name, description
     FROM products
     WHERE category = '${req.query.category}'
     AND released = TRUE`,
  );

  res.json(result.rows);
});