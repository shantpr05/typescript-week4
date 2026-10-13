# SQL Joins, Relationships & Subqueries

## Overview

This assignment focuses on understanding database relationships and practising SQL queries using PostgreSQL. It builds on the previous week's work with Docker, PostgreSQL, pgAdmin, and the Country Club database.

The assignment covers one-to-one, one-to-many, and many-to-many relationships, primary keys, foreign keys, different types of JOINs, and subqueries.

## Learning Objectives

- Understand how tables are connected using primary keys and foreign keys.
- Create one-to-one, one-to-many, and many-to-many relationships.
- Use composite primary keys to prevent duplicate records.
- Retrieve data from multiple tables using `INNER JOIN` and `LEFT JOIN`.
- Practise self-joins to retrieve related records from the same table.
- Use subqueries to retrieve and filter data.
- Understand how to calculate booking costs using conditional expressions.

## Technologies Used

- PostgreSQL
- pgAdmin 4
- Docker and Docker Compose
- SQL
- Git and GitHub

## Project Structure

```text
week7/sqljoins/
├── compose.yml
├── relationships.sql
├── joins.sql
├── .env
└── .gitignore
```

- **compose.yml** – Configures the PostgreSQL and pgAdmin containers.
- **relationships.sql** – Creates example tables, inserts sample data, and demonstrates database relationships.
- **joins.sql** – Contains the Country Club relationship explanations and solutions to the JOIN and subquery exercises.
- **.env** – Stores environment variables used by Docker Compose.
- **.gitignore** – Prevents sensitive files such as `.env` from being committed to GitHub.

## Part 1: Database Relationships

The `relationships.sql` file demonstrates three types of relationships.

### 1. One-to-One Relationship

Uses `users` and `profiles` tables. Each profile belongs to one user, and a `UNIQUE` constraint on `user_id` ensures that a user cannot have multiple profiles.

### 2. One-to-Many Relationship

Uses `authors` and `books` tables. One author can have multiple books, and the foreign key `author_id` connects each book to its author.

### 3. Many-to-Many Relationship

Uses `students`, `courses`, and `student_courses` tables. Students can enrol in multiple courses, and each course can have multiple students. A composite primary key prevents duplicate student-course combinations.

The file also demonstrates how foreign key and primary key constraints prevent invalid or duplicate records.

## Part 2: Country Club Relationships

The Country Club database contains three main tables:

- `cd.members` – Stores member information.
- `cd.bookings` – Stores facility bookings made by members.
- `cd.facilities` – Stores information about the available facilities.

The `bookings` table connects members and facilities. The `recommendedby` column in `cd.members` references another member in the same table, demonstrating a self-referencing relationship.

## Part 3: JOINs and Subqueries

The `joins.sql` file contains solutions to eight exercises:

1. Retrieve the start times of a member's bookings.
2. Retrieve booking start times for tennis courts.
3. List members who have recommended another member.
4. List all members along with their recommenders.
5. List members who have used a tennis court.
6. Retrieve costly bookings using conditional cost calculations.
7. List members and their recommenders using subqueries instead of JOINs.
8. Retrieve costly bookings using a subquery.

These exercises practise `INNER JOIN`, `LEFT JOIN`, self-joins, multiple-table JOINs, `CASE` expressions, and subqueries.

## How to Run the Project

### 1. Start Docker containers

Make sure Docker Desktop is running, then execute the following command in the project directory:

```bash
docker compose up -d
```

### 2. Open pgAdmin

Open [http://localhost:8080](http://localhost:8080) in your browser and connect to the PostgreSQL server.

### 3. Select the database

Choose the database containing the Country Club data. Use the same database for both SQL files.

### 4. Run the SQL files

Open the Query Tool in pgAdmin and execute `relationships.sql` to create the example tables and insert sample data.

Then execute `joins.sql` to run the Country Club JOIN and subquery exercises.

Check the Data Output panel to verify the results and confirm that the queries execute successfully.

## Security

Database credentials and other sensitive environment variables are stored in `.env`. This file is excluded from version control using `.gitignore` and should not be committed to GitHub.

## What I Learned

Through this assignment, I practised creating relational database tables, defining primary and foreign keys, and understanding how relationships work. I also gained experience retrieving related information from multiple tables using JOINs, handling missing related records with LEFT JOINs, and using subqueries to solve SQL problems.

This assignment helped me understand how relational databases organise connected data and how SQL queries can retrieve meaningful information from it.
