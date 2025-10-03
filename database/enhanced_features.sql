-- Enhanced Features Database Schema
USE quiz_platform;

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN xp_points INT DEFAULT 0,
ADD COLUMN level INT DEFAULT 1,
ADD COLUMN current_streak INT DEFAULT 0,
ADD COLUMN longest_streak INT DEFAULT 0,
ADD COLUMN last_quiz_date DATE,
ADD COLUMN coins INT DEFAULT 0,
ADD COLUMN dark_mode BOOLEAN DEFAULT FALSE,
ADD COLUMN avatar VARCHAR(50) DEFAULT '👤';

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    requirement_type VARCHAR(50), -- 'quizzes_taken', 'total_score', 'streak', 'category_mastery'
    requirement_value INT,
    xp_reward INT DEFAULT 100,
    coin_reward INT DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_achievements table (many-to-many)
CREATE TABLE IF NOT EXISTS user_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id)
);

-- Create daily challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    challenge_date DATE NOT NULL UNIQUE,
    category_id INT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    bonus_xp INT DEFAULT 200,
    bonus_coins INT DEFAULT 100,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create challenge completions table
CREATE TABLE IF NOT EXISTS challenge_completions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    score INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES daily_challenges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_challenge (user_id, challenge_id)
);

-- Update scores table to include time and XP
ALTER TABLE scores 
ADD COLUMN xp_earned INT DEFAULT 0,
ADD COLUMN coins_earned INT DEFAULT 0,
ADD COLUMN speed_bonus INT DEFAULT 0;

-- Insert sample achievements
INSERT INTO achievements (name, description, icon, requirement_type, requirement_value, xp_reward, coin_reward) VALUES
('First Steps', 'Complete your first quiz', '🎯', 'quizzes_taken', 1, 50, 25),
('Quick Learner', 'Complete 5 quizzes', '📚', 'quizzes_taken', 5, 100, 50),
('Knowledge Seeker', 'Complete 10 quizzes', '🔍', 'quizzes_taken', 10, 200, 100),
('Quiz Master', 'Complete 25 quizzes', '👑', 'quizzes_taken', 25, 500, 250),
('Century Club', 'Earn 100 total score', '💯', 'total_score', 100, 150, 75),
('High Achiever', 'Earn 500 total score', '🌟', 'total_score', 500, 300, 150),
('Elite Scholar', 'Earn 1000 total score', '⭐', 'total_score', 1000, 600, 300),
('Streak Starter', 'Maintain a 3-day streak', '🔥', 'streak', 3, 100, 50),
('On Fire', 'Maintain a 7-day streak', '🔥🔥', 'streak', 7, 250, 125),
('Unstoppable', 'Maintain a 30-day streak', '🔥🔥🔥', 'streak', 30, 1000, 500),
('Math Wizard', 'Score 90%+ in 5 Math quizzes', '🧙‍♂️', 'category_mastery', 1, 300, 150),
('Science Genius', 'Score 90%+ in 5 Science quizzes', '🔬', 'category_mastery', 2, 300, 150),
('Speed Demon', 'Complete a quiz in under 2 minutes', '⚡', 'speed', 120, 200, 100),
('Perfect Score', 'Get 100% in any quiz', '💎', 'perfect_score', 1, 250, 125),
('Night Owl', 'Complete 10 quizzes in dark mode', '🦉', 'dark_mode', 10, 150, 75);

-- Create analytics view
CREATE OR REPLACE VIEW user_analytics AS
SELECT 
    u.id,
    u.username,
    u.xp_points,
    u.level,
    u.current_streak,
    u.longest_streak,
    u.total_score,
    u.quizzes_taken,
    ROUND(u.total_score / NULLIF(u.quizzes_taken, 0), 2) as avg_score,
    COUNT(DISTINCT ua.achievement_id) as achievements_unlocked,
    (SELECT COUNT(*) FROM scores WHERE user_id = u.id AND score >= 90) as excellent_scores,
    (SELECT COUNT(*) FROM scores WHERE user_id = u.id AND score = 100) as perfect_scores
FROM users u
LEFT JOIN user_achievements ua ON u.id = ua.user_id
GROUP BY u.id;

-- Create today's daily challenge
INSERT INTO daily_challenges (challenge_date, category_id, difficulty, bonus_xp, bonus_coins)
VALUES (CURDATE(), 1, 'medium', 200, 100)
ON DUPLICATE KEY UPDATE challenge_date = challenge_date;

-- Function to calculate XP based on score and difficulty
DELIMITER //
CREATE FUNCTION calculate_xp(score INT, difficulty VARCHAR(10), time_taken INT) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE base_xp INT;
    DECLARE difficulty_multiplier DECIMAL(3,1);
    DECLARE time_bonus INT;
    DECLARE total_xp INT;
    
    SET base_xp = score;
    
    -- Difficulty multiplier
    SET difficulty_multiplier = CASE difficulty
        WHEN 'easy' THEN 1.0
        WHEN 'medium' THEN 1.5
        WHEN 'hard' THEN 2.0
        ELSE 1.0
    END;
    
    -- Time bonus (faster = more bonus)
    SET time_bonus = CASE
        WHEN time_taken < 60 THEN 50
        WHEN time_taken < 120 THEN 30
        WHEN time_taken < 180 THEN 15
        ELSE 0
    END;
    
    SET total_xp = ROUND(base_xp * difficulty_multiplier) + time_bonus;
    
    RETURN total_xp;
END//
DELIMITER ;

-- Create indexes for better performance
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_scores_user_score ON scores(user_id, score);
CREATE INDEX idx_users_streak ON users(current_streak);
CREATE INDEX idx_users_xp ON users(xp_points DESC);
