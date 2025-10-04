-- Add Group Quiz Categories
USE quiz_platform;

-- Insert new categories for Group Quiz
INSERT INTO categories (name, description, icon) VALUES
('Compiler Design', 'Lexical analysis, parsing, code generation', '⚙️'),
('Computer Networks', 'Network protocols, OSI model, TCP/IP', '🌐'),
('Data Mining Techniques', 'Data analysis, pattern recognition, algorithms', '⛏️'),
('Machine Learning', 'Supervised learning, neural networks, AI models', '🤖'),
('Introduction to Artificial Intelligence', 'AI fundamentals, search algorithms, knowledge representation', '🧠');

-- Add category type column to differentiate quiz types
ALTER TABLE categories ADD COLUMN category_type ENUM('normal', 'group', 'ai') DEFAULT 'normal';

-- Update existing categories to 'normal'
UPDATE categories SET category_type = 'normal' WHERE id <= 8;

-- Update new categories to 'group'
UPDATE categories SET category_type = 'group' WHERE id > 8;

-- Verify
SELECT id, name, category_type, icon FROM categories ORDER BY category_type, id;
