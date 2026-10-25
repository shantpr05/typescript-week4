# Library Management API

## Overview

This project is a Library Management application built using Node.js, Express.js, and PostgreSQL. It was developed as part of the Week 8 backend assignment to practise REST APIs, database integration, SQL queries, relationships between tables, and frontend-backend communication.

The application allows users to manage books, search and filter records, work with authors and members, and manage book loans. A simple frontend provides an interface for viewing, adding, searching, and deleting books.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – REST API and web server
- **PostgreSQL** – Relational database
- **Docker Compose** – Database and pgAdmin containers
- **node-postgres (`pg`)** – PostgreSQL connection and queries
- **dotenv** – Environment variable configuration
- **HTML** – Frontend structure
- **CSS** – Frontend styling
- **JavaScript Fetch API** – Communication between the frontend and backend

## Project Structure

```text
typescript-week4/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── db.js
├── index.js
├── init.sql
├── compose.yml
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Features

### 1. Book Management — CRUD

The API supports the four main CRUD operations:

- **Create:** Add a new book.
- **Read:** Retrieve all books or a specific book by ID.
- **Update:** Replace a book's editable fields using PUT.
- **Delete:** Remove a book by ID.

### 2. Validation and Error Handling

- Validates book IDs and required fields.
- Returns appropriate HTTP status codes.
- Handles records that do not exist.
- Uses parameterised SQL queries for database values.
- Returns error responses when database operations fail.

### 3. Filtering and Sorting

Books can be filtered by genre and sorted using approved columns.

Examples:

```text
GET /books?genre=fantasy
GET /books?sortBy=title&order=asc
GET /books?genre=dystopian&sortBy=published_year&order=desc
```

The sorting implementation uses an allowlist of permitted columns.

### 4. Partial Updates

The PATCH endpoint updates only the fields supplied in the request.

```text
PATCH /books/:id
```

### 5. Database Relationships

The application uses relational database tables:

- **Books and authors:** One-to-many relationship.
- **Members and loans:** Members can borrow multiple books, and books can be borrowed by different members over time.
- **Loans:** Connect members and books and record borrowing and return timestamps.

SQL JOIN queries retrieve books with author information and loan records with member and book information.

### 6. Borrowing and Returning Books

- Create a loan using a member ID and book ID.
- Prevent duplicate active loans for the same book using a partial unique index.
- Record a book's return timestamp.
- Handle invalid references and duplicate active loans.

### 7. Search, Pagination, and Statistics

- Search books by title.
- Filter books by genre.
- Sort books by approved columns.
- Paginate results using `page` and `limit`.
- Retrieve library statistics through the `/stats` endpoint.

### 8. Frontend

The frontend allows users to:

- View the list of books.
- Search for books by title.
- Add new books.
- Delete books.
- View success and error messages.

The frontend communicates with the Express API using JavaScript's Fetch API.

## Installation and Setup

### Prerequisites

Install the following:

- Node.js and npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd typescript-week4
```

Replace `<your-repository-url>` with your Git repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```dotenv
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=library

PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=root

DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

Use your own credentials where appropriate. Do not commit `.env` or expose database passwords in the repository.

### 4. Start PostgreSQL and pgAdmin

Start the Docker services:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker compose ps
```

The PostgreSQL database is exposed on port `5432`, and pgAdmin is exposed on port `8080`, according to the current Compose configuration.

Open pgAdmin at:

```text
http://localhost:8080
```

When connecting from pgAdmin to PostgreSQL, use `postgres` as the hostname. When connecting from the Node.js application running on your computer, use `localhost`.

### 5. Create and initialise the database

Create the `library` database if it does not already exist:

```powershell
docker compose exec postgres psql -U root -d postgres -c "CREATE DATABASE library;"
```

If the database already exists, do not run that command again.

Execute the initial books schema and sample data when setting up a fresh database:

```powershell
Get-Content .\init.sql | docker compose exec -T postgres psql -U root -d library
```

The initial SQL creates the `books` table and inserts sample book records. The authors, members, and loans tables must also be created using the additional SQL for those exercises.

**Important:** PostgreSQL initialisation scripts are not automatically rerun when a database volume already exists. Avoid deleting persistent Docker volumes when troubleshooting.

### 6. Start the Express server

Development mode:

```bash
npm run dev
```

Or start the application normally:

```bash
npm start
```

Open the application:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome route or frontend page |
| GET | `/books` | Retrieve books, with filtering, sorting, search and pagination |
| GET | `/books/:id` | Retrieve one book |
| POST | `/books` | Create a book |
| PUT | `/books/:id` | Update a book's editable fields |
| PATCH | `/books/:id` | Partially update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/books-with-authors` | Retrieve books with author names |
| POST | `/loans` | Borrow a book |
| PATCH | `/loans/:id/return` | Return a borrowed book |
| GET | `/stats` | Retrieve library statistics |

## Example API Requests

### Retrieve all books

```http
GET http://localhost:3000/books
```

### Search books

```http
GET http://localhost:3000/books?search=Hobbit
```

### Add a book

```http
POST http://localhost:3000/books
Content-Type: application/json
```

```json
{
  "title": "The Fellowship of the Ring",
  "genre": "fantasy",
  "published_year": 1954
}
```

A successful creation returns `201 Created`.

### Update a book

```http
PUT http://localhost:3000/books/1
Content-Type: application/json
```

```json
{
  "title": "The Hobbit",
  "genre": "fantasy",
  "published_year": 1937
}
```

### Partially update a book

```http
PATCH http://localhost:3000/books/1
Content-Type: application/json
```

```json
{
  "genre": "classic fantasy"
}
```

### Delete a book

```http
DELETE http://localhost:3000/books/1
```

Use a test record when checking deletion.

### Borrow a book

```http
POST http://localhost:3000/loans
Content-Type: application/json
```

```json
{
  "member_id": 1,
  "book_id": 3
}
```

### Return a book

```http
PATCH http://localhost:3000/loans/1/return
```

Replace `1` with the actual loan ID returned when the loan was created.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | A new book or loan was created |
| `400 Bad Request` | Invalid input or request data |
| `404 Not Found` | Requested book or active loan was not found |
| `409 Conflict` | Book already has an active loan |
| `500 Internal Server Error` | Unexpected server or database error |

The exact responses depend on the endpoint and its error-handling implementation.

## Database Connection

The PostgreSQL connection pool is configured in `db.js` using environment variables.

The application uses parameterised SQL queries for values to reduce the risk of SQL injection. Sorting columns are selected from an allowlist rather than accepted directly from user input.

## Learning Outcomes

Through this assignment, I practised:

- Building REST APIs with Express.js.
- Connecting Node.js to PostgreSQL.
- Implementing CRUD operations.
- Validating request data and handling errors.
- Writing SQL queries with parameters.
- Using filtering, sorting, search, and pagination.
- Creating one-to-many and many-to-many relationships.
- Using JOINs to retrieve related records.
- Managing borrowing and return operations.
- Connecting a frontend to a backend with Fetch API.
- Running PostgreSQL and pgAdmin with Docker Compose.

## Running the Application

1. Start Docker Desktop.
2. Start the PostgreSQL and pgAdmin containers.
3. Ensure the `library` database and required tables exist.
4. Install npm dependencies.
5. Configure the `.env` file.
6. Run `npm run dev`.
7. Open `http://localhost:3000` in your browser.

