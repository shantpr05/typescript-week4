import express from "express";

import { z } from "zod";

const app = express();

app.use(express.json());

const PORT = 3000;

const randomPersonSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        country: z.string(),
      }),
    })
  ),
});

const userSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number().min(18).max(100).default(28),
  email: z.string().email().toLowerCase(),
});

const randomLoginSchema = z.object({
  results: z.array(
    z.object({
      login: z.object({
        username: z.string(),
      }),
      registered: z.object({
        date: z.string(),
      }),
    })
  ),
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    message: "pong",
  });
});

app.get("/random-person", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      return res.status(500).json({
        error: "Failed to fetch random person",
      });
    }

    const data = await response.json();

    const result = randomPersonSchema.safeParse(data);

    if (!result.success) {
      return res.status(500).json({
        error: "Random User API returned unexpected data",
        details: result.error.issues,
      });
    }

    const person = result.data.results[0];

    return res.status(200).json({
      name: `${person.name.first} ${person.name.last}`,
      country: person.location.country,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch random person",
    });
  }
});

app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid user data",
      details: result.error.issues,
    });
  }

  return res.status(201).json(result.data);
});

app.get("/random-login", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      return res.status(500).json({
        error: "Failed to fetch random user",
      });
    }

    const data = await response.json();

    const result = randomLoginSchema.safeParse(data);

    if (!result.success) {
      return res.status(500).json({
        error: "Random User API returned unexpected data",
        details: result.error.issues,
      });
    }

    const user = result.data.results[0];

    const registeredDate = user.registered.date.slice(0, 10);

    return res.status(200).json({
      username: user.login.username,
      registered: registeredDate,
      summary: `${user.login.username} (registered on ${registeredDate})`,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch random user",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});