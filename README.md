## Week 10 – Sequelize ORM

### Overview

This assignment converts the existing Express and PostgreSQL application to use Sequelize, an Object-Relational Mapper (ORM).

Sequelize allows the application to interact with PostgreSQL using JavaScript/TypeScript models instead of writing raw SQL queries for every database operation.

### Technologies Used

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Sequelize ORM
- Docker
- Zod

### Project Structure

```text
src/
├── models/
│   ├── Author.ts
│   ├── Book.ts
│   ├── Loan.ts
│   └── Member.ts
├── sequelize.ts
└── index.ts

screenshots/
ANSWERS.md
QUERIES.md
```

### Database Models and Associations

The application contains four Sequelize models:

- **Book** – stores book information.
- **Author** – stores author information.
- **Member** – stores library member information.
- **Loan** – stores borrowing and returning information.

The following associations are configured:

- One Author can have many Books.
- One Book belongs to one Author.
- Members and Books have a many-to-many relationship through the Loan model.
- Each Loan belongs to one Member and one Book.

The `loans` table acts as a junction table and stores additional information about each borrowing transaction, including `borrowed_at` and `returned_at`.

### Implemented API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books with author information |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Create a book |
| PUT | `/books/:id` | Update a book |
| PATCH | `/books/:id` | Partially update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/authors/:id/books` | Get an author with associated books |
| GET | `/members/:id/loans` | Get a member with borrowed books |
| POST | `/loans` | Create a new loan |
| PATCH | `/loans/:id/return` | Return a borrowed book |
| GET | `/stats` | Get book statistics |

### Sequelize Features Practised

- Creating Sequelize models.
- Configuring a PostgreSQL database connection.
- Defining one-to-many and many-to-many associations.
- Using eager loading with `include`.
- Using `findAll()`, `findByPk()`, `findOne()`, `create()`, `update()` and `destroy()`.
- Using aggregate functions such as `COUNT`, `MIN` and `MAX`.
- Understanding generated SQL queries.
- Using junction tables for many-to-many relationships.
- Handling database errors and API responses.

### Running the Project

1. Install dependencies:

```bash
npm install
```

2. Configure your `.env` file with the PostgreSQL connection details:

```env
DB_USER=root
DB_HOST=localhost
DB_DATABASE=library
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

3. Start the PostgreSQL Docker services:

```bash
docker compose up -d
```

4. Start the development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### Validation

Run TypeScript type checking:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

### Assignment Documentation

- `ANSWERS.md` – answers for Skill 1 and the Skill 4 junction table question.
- `QUERIES.md` – generated Sequelize SQL queries and equivalent SQL queries.
- `screenshots/` – screenshots of Insomnia API tests and responses.

### Conclusion

This assignment provided practical experience in integrating Sequelize with an existing Express and PostgreSQL application, defining model relationships, performing CRUD operations, implementing eager loading and using ORM methods for database queries.