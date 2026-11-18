# Week 10 – Sequelize Answers

## Skill 1 – Sequelize and ORM

### 1. What does Sequelize do?

Sequelize acts as a translator between JavaScript/TypeScript code and a relational database. It converts model operations into SQL queries and database results into JavaScript objects.

### 2. What does ORM stand for?

ORM stands for Object-Relational Mapping.

- Object: JavaScript or TypeScript objects.
- Relational: Relational database tables, rows and columns.
- Mapping: Connecting application objects to database tables and records.

### 3. What SQL does Sequelize generate for `Book.findAll()` and `Book.findByPk(3)`?

For `Book.findAll()`:

```sql
SELECT * FROM books;
```

For `Book.findByPk(3)`:

```sql
SELECT * FROM books WHERE id = 3;
```

These are simplified equivalent SQL queries.

### 4. What are the options in `new Sequelize(...)`?

- `host`: The database server address.
- `port`: The database connection port.
- `dialect`: The database type, such as PostgreSQL.
- `logging`: Controls SQL query logging. `false` disables logging; `console.log` prints generated SQL.

### 5. What is the difference between `sequelize.sync()` and `sequelize.sync({ force: true })`?

- `sequelize.sync()` creates missing tables based on the models.
- `sequelize.sync({ force: true })` drops existing tables and recreates them. Existing data can be lost.

### 6. When is plain SQL better than using Sequelize?

Plain SQL can be better for complex queries, advanced reports, database-specific features and situations where precise control over query performance is important.

## Skill 4 – Junction Table Question

### Why does the loan date belong in the `loans` table instead of the `books` or `members` table?

The loan date belongs in the `loans` junction table because it describes the relationship and transaction between a member and a book.

A member can borrow many books, and a book can be borrowed by different members at different times. Each borrowing is a separate loan record with its own `borrowed_at` and `returned_at` dates.

If the loan date were stored in the `books` table, a book could only have one loan date. If it were stored in the `members` table, a member could only have one loan date.

The `loans` table correctly stores each borrowing event, including the member ID, book ID, borrowed date and returned date.
