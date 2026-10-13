SELECT * FROM cd.members;
-- ============================================
-- 1. ONE-TO-ONE RELATIONSHIP
-- Users and Profiles
-- ============================================

DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name) VALUES
('Alice'),
('Bob'),
('Charlie');

INSERT INTO profiles (user_id, bio) VALUES
(1, 'Frontend developer'),
(2, 'Backend developer'),
(3, 'Data analyst');

SELECT
    users.name,
    profiles.bio
FROM users
JOIN profiles
    ON users.id = profiles.user_id;


-- ============================================
-- 2. ONE-TO-MANY RELATIONSHIP
-- Authors and Books
-- ============================================

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (name) VALUES
('J.K. Rowling'),
('George Orwell'),
('Jane Austen');

INSERT INTO books (title, author_id) VALUES
('Harry Potter', 1),
('Harry Potter and the Chamber of Secrets', 1),
('1984', 2),
('Animal Farm', 2),
('Pride and Prejudice', 3);

SELECT
    authors.name AS author,
    books.title AS book
FROM authors
JOIN books
    ON authors.id = books.author_id;


-- ============================================
-- 3. MANY-TO-MANY RELATIONSHIP
-- Students and Courses
-- ============================================

DROP TABLE IF EXISTS student_courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE student_courses (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,

    PRIMARY KEY (student_id, course_id),

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO students (name) VALUES
('Alice'),
('Bob'),
('Charlie');

INSERT INTO courses (name) VALUES
('SQL'),
('JavaScript'),
('Python');

INSERT INTO student_courses (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 3);

SELECT
    students.name AS student,
    courses.name AS course
FROM students
JOIN student_courses
    ON students.id = student_courses.student_id
JOIN courses
    ON courses.id = student_courses.course_id;


-- ============================================
-- TRY TO BREAK IT
-- ============================================

-- This should fail because author_id 999 does not exist.
-- INSERT INTO books (title, author_id)
-- VALUES ('Unknown Book', 999);

-- This should fail because the same student/course
-- combination already exists.
-- INSERT INTO student_courses (student_id, course_id)
-- VALUES (1, 1);

-- Explanation:
-- The first error happens because author_id is a foreign key
-- referencing authors(id), and author 999 does not exist.
--
-- The second error happens because student_id + course_id
-- together form a composite primary key, so duplicate
-- combinations are not allowed.