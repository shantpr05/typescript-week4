# SQL Basics Homework

This project is part of the SQL Basics homework. The project uses Docker, PostgreSQL and pgAdmin to work with the Country Club database and practise basic SQL queries.

## Technologies

* PostgreSQL
* pgAdmin
* Docker / Docker Compose
* SQL

## Database

The project uses the Country Club dataset from [pgExercises](https://pgexercises.com/).

The database contains the following schema and tables:

* `cd.facilities`
* `cd.members`
* `cd.bookings`

## SQL Exercises

The `cd.sql` file contains solutions for the PostgreSQL Basic SQL exercises:

1. Retrieve everything from a table
2. Retrieve specific columns
3. WHERE
4. WHERE part 2
5. LIKE
6. IN
7. CASE
8. Dates
9. DISTINCT and ORDER BY
10. UNION
11. MAX and COUNT
12. Aggregation

Each exercise is separated with a comment explaining its purpose.

## Docker Setup

The project uses Docker Compose to run:

* PostgreSQL
* pgAdmin

Start the containers with:

```bash
docker compose up -d
```

Check that the containers are running:

```bash
docker container ls
```

pgAdmin is available at:

```text
http://localhost:8080
```

## Running the SQL

After connecting pgAdmin to the PostgreSQL database, open the Query Tool and run the SQL queries from `cd.sql`.

For example:

```sql
SELECT * FROM cd.facilities;
```

## Project Structure

```text
typescript-week4/
│
├── compose.yml
├── .env
├── .gitignore
├── cd.sql
└── README.md
```

## Environment Variables

Database credentials are stored in `.env`.

The `.env` file is included in `.gitignore` and should not be committed to GitHub.

## Branch

This homework is completed on the:

```text
week7-sqlbasics
```

branch.
