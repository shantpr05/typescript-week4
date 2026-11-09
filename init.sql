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

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    released INTEGER NOT NULL DEFAULT 1
);

INSERT INTO products (name, description, category, released)
VALUES
('Laptop', 'Professional laptop', 'Tech gifts', 1),
('Headphones', 'Wireless headphones', 'Tech gifts', 1),
('Old Camera', 'Vintage camera', 'Gifts', 0),
('Coffee Mug', 'Ceramic coffee mug', 'Gifts', 1),
('Keyboard', 'Mechanical keyboard', 'Tech gifts', 0)
ON CONFLICT DO NOTHING;