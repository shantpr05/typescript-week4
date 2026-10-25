
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  published_year: z.coerce
    .number()
    .int()
    .min(1, "Published year must be positive"),
});

export const bookIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const bookQuerySchema = z.object({
  genre: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(["id", "title", "genre", "published_year"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
