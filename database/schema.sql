-- Quiz Platform Database Schema

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    total_score INT DEFAULT 0,
    quizzes_taken INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Scores Table
CREATE TABLE scores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    time_taken INT, -- in seconds
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- User Progress Table (optional - for tracking individual question attempts)
CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_scores_user ON scores(user_id);
CREATE INDEX idx_scores_category ON scores(category_id);
CREATE INDEX idx_questions_category_difficulty ON questions(category_id, difficulty);
CREATE INDEX idx_users_total_score ON users(total_score DESC);

-- Insert Default Categories
INSERT INTO categories (name, description, icon) VALUES
('Mathematics', 'Test your mathematical skills', '🔢'),
('Science', 'Explore scientific concepts', '🔬'),
('Social Studies', 'History, Geography, and Civics', '🌍'),
('General Knowledge', 'Test your general awareness', '💡'),
('Python', 'Python programming challenges', '🐍'),
('JavaScript', 'JavaScript coding questions', '📜'),
('Java', 'Java programming concepts', '☕'),
('C++', 'C++ programming challenges', '⚡');

-- Sample Questions (Mathematics - Easy)
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(1, 'easy', 'What is 15 + 27?', '40', '42', '43', '45', 'B', '15 + 27 = 42'),
(1, 'easy', 'What is 8 × 7?', '54', '56', '58', '62', 'B', '8 × 7 = 56'),
(1, 'easy', 'What is 100 - 35?', '55', '60', '65', '70', 'C', '100 - 35 = 65');

-- Sample Questions (Science - Easy)
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(2, 'easy', 'What is the chemical symbol for water?', 'H2O', 'O2', 'CO2', 'HO', 'A', 'Water is composed of two hydrogen atoms and one oxygen atom'),
(2, 'easy', 'Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'B', 'Mars appears red due to iron oxide on its surface');

-- Sample Questions (Python - Medium)
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(5, 'medium', 'What is the output of: print(type([]))', '<class list>', '<class array>', '<class tuple>', '<class dict>', 'A', '[] creates an empty list in Python'),
(5, 'medium', 'Which keyword is used to define a function in Python?', 'function', 'def', 'func', 'define', 'B', 'The def keyword is used to define functions in Python');

-- View for Leaderboard
CREATE VIEW leaderboard AS
SELECT 
    u.id,
    u.username,
    u.total_score,
    u.quizzes_taken,
    ROUND(u.total_score / NULLIF(u.quizzes_taken, 0), 2) as avg_score,
    RANK() OVER (ORDER BY u.total_score DESC) as rank_position
FROM users u
WHERE u.quizzes_taken > 0
ORDER BY u.total_score DESC
LIMIT 100;