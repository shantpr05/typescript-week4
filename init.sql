CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    published_year INT
);

INSERT INTO books (title, genre, published_year)
VALUES
    ('The Hobbit', 'fantasy', 1937),
    ('1984', 'dystopian', 1949),
    ('Pippi Longstocking', 'children', 1945),
    ('The Hunger Games', 'dystopian', 2008);


-- Create the authors table
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Add the author relationship to books
ALTER TABLE books
ADD COLUMN author_id INTEGER REFERENCES authors(id);

-- Insert sample authors
INSERT INTO authors (name) VALUES
('J.R.R. Tolkien'),
('George Orwell'),
('Astrid Lindgren'),
('Suzanne Collins');

-- Connect existing books to their authors
UPDATE books SET author_id = 1 WHERE title = 'The Hobbit';
UPDATE books SET author_id = 2 WHERE title = '1984';
UPDATE books SET author_id = 3 WHERE title = 'Pippi Longstocking';
UPDATE books SET author_id = 4 WHERE title = 'The Hunger Games';
