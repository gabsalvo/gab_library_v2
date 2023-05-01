CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    summary TEXT,
    isbn VARCHAR(20),
    added DATE,
    times INT
);

-- Add any initial data if needed
INSERT INTO books (title, author, summary, isbn, added, times) VALUES
('Book Title 1', 'Author Name 1', 'Book summary 1', '1234567890123', '2023-01-01', 1),
('Book Title 2', 'Author Name 2', 'Book summary 2', '1234567890456', '2023-01-02', 1);
