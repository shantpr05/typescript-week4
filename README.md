## Week 9 – MongoDB & Mongoose Homework

### Overview

Implemented a Library API using MongoDB, Mongoose and Express.js.

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker and Docker Compose
- Insomnia

### Exercises completed

1. Book model and basic API routes
2. CRUD operations for books
3. MongoDB connection using environment variables
4. Schema validation
5. Filtering, sorting and pagination
6. Authors and document population
7. Members and loans
8. MongoDB aggregation and statistics
9. Embedding vs referencing

### Running the project

Navigate to the project folder:

```bash
cd week9/mongodb
```

Start MongoDB:

```bash
docker compose up -d
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` and configure your MongoDB connection.

Start the API:

```bash
npm run dev
```

The API runs at:

`http://localhost:3000`

### Documentation

See `week9/mongodb/COMPARISON.md` for the comparison between PostgreSQL and MongoDB.