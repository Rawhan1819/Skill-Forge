// server.js - Main Express Server
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quiz_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// AUTH ROUTES
// ============================================

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );

    // Generate token
    const token = jwt.sign(
      { id: result.insertId, username, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.insertId, username, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        totalScore: user.total_score,
        quizzesTaken: user.quizzes_taken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ============================================
// CATEGORY ROUTES
// ============================================

// Get All Categories
app.get('/api/categories', authenticateToken, async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ============================================
// QUIZ ROUTES
// ============================================

// Get Quiz Questions
app.get('/api/quiz/:categoryId/:difficulty', authenticateToken, async (req, res) => {
  try {
    const { categoryId, difficulty } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const [questions] = await pool.query(
      `SELECT id, question, option_a, option_b, option_c, option_d 
       FROM questions 
       WHERE category_id = ? AND difficulty = ? 
       ORDER BY RAND() 
       LIMIT ?`,
      [categoryId, difficulty, limit]
    );

    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for this category and difficulty' });
    }

    res.json(questions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// Submit Quiz Answers
app.post('/api/quiz/submit', authenticateToken, async (req, res) => {
  try {
    const { categoryId, difficulty, answers, timeTaken } = req.body;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Get correct answers
    const questionIds = answers.map(a => a.questionId);
    const [correctAnswers] = await pool.query(
      `SELECT id, correct_answer, explanation FROM questions WHERE id IN (?)`,
      [questionIds]
    );

    // Calculate score
    let score = 0;
    const results = answers.map(answer => {
      const correct = correctAnswers.find(q => q.id === answer.questionId);
      const isCorrect = correct && answer.selectedAnswer === correct.correct_answer;
      if (isCorrect) score++;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: correct?.correct_answer,
        isCorrect,
        explanation: correct?.explanation
      };
    });

    const totalQuestions = answers.length;
    const scorePercentage = Math.round((score / totalQuestions) * 100);

    // Save score
    await pool.query(
      `INSERT INTO scores (user_id, category_id, difficulty, score, total_questions, time_taken) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, categoryId, difficulty, scorePercentage, totalQuestions, timeTaken]
    );

    // Update user total score
    await pool.query(
      `UPDATE users 
       SET total_score = total_score + ?, quizzes_taken = quizzes_taken + 1 
       WHERE id = ?`,
      [scorePercentage, userId]
    );

    res.json({
      score: scorePercentage,
      correctAnswers: score,
      totalQuestions,
      results
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// ============================================
// USER ROUTES
// ============================================

// Get User Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, username, email, total_score, quizzes_taken, created_at 
       FROM users WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get User Score History
app.get('/api/user/scores', authenticateToken, async (req, res) => {
  try {
    const [scores] = await pool.query(
      `SELECT s.*, c.name as category_name 
       FROM scores s 
       JOIN categories c ON s.category_id = c.id 
       WHERE s.user_id = ? 
       ORDER BY s.timestamp DESC 
       LIMIT 50`,
      [req.user.id]
    );

    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// ============================================
// LEADERBOARD ROUTES
// ============================================

// Get Global Leaderboard
app.get('/api/leaderboard', authenticateToken, async (req, res) => {
  try {
    const [leaderboard] = await pool.query(
      `SELECT 
        u.id,
        u.username,
        u.total_score,
        u.quizzes_taken,
        ROUND(u.total_score / NULLIF(u.quizzes_taken, 0), 2) as avg_score,
        RANK() OVER (ORDER BY u.total_score DESC) as rank_position
       FROM users u
       WHERE u.quizzes_taken > 0
       ORDER BY u.total_score DESC
       LIMIT 100`
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get Category Leaderboard
app.get('/api/leaderboard/category/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const [leaderboard] = await pool.query(
      `SELECT 
        u.id,
        u.username,
        SUM(s.score) as category_score,
        COUNT(s.id) as attempts,
        ROUND(AVG(s.score), 2) as avg_score
       FROM users u
       JOIN scores s ON u.id = s.user_id
       WHERE s.category_id = ?
       GROUP BY u.id, u.username
       ORDER BY category_score DESC
       LIMIT 50`,
      [categoryId]
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching category leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch category leaderboard' });
  }
});

// ============================================
// START SERVER
// ============================================
// Add these NEW routes to your existing server.js (before app.listen)

// ============================================
// ENHANCED FEATURES - ADD THESE ROUTES
// ============================================

// Get User Analytics
app.get('/api/user/analytics', authenticateToken, async (req, res) => {
  try {
    const [analytics] = await pool.query(
      'SELECT * FROM user_analytics WHERE id = ?',
      [req.user.id]
    );

    if (analytics.length === 0) {
      return res.status(404).json({ error: 'Analytics not found' });
    }

    // Get category breakdown
    const [categoryStats] = await pool.query(
      `SELECT c.name, c.icon,
              COUNT(s.id) as attempts,
              ROUND(AVG(s.score), 2) as avg_score,
              MAX(s.score) as best_score
       FROM categories c
       LEFT JOIN scores s ON c.id = s.category_id AND s.user_id = ?
       GROUP BY c.id, c.name, c.icon
       HAVING attempts > 0
       ORDER BY avg_score DESC`,
      [req.user.id]
    );

    // Get recent performance (last 10 quizzes)
    const [recentPerformance] = await pool.query(
      `SELECT score, timestamp 
       FROM scores 
       WHERE user_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 10`,
      [req.user.id]
    );

    res.json({
      ...analytics[0],
      categoryStats,
      recentPerformance: recentPerformance.reverse()
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get User Achievements
app.get('/api/user/achievements', authenticateToken, async (req, res) => {
  try {
    // Get all achievements with unlock status
    const [achievements] = await pool.query(
      `SELECT a.*, 
              ua.unlocked_at,
              (ua.id IS NOT NULL) as unlocked
       FROM achievements a
       LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
       ORDER BY unlocked DESC, a.xp_reward DESC`,
      [req.user.id]
    );

    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Check and Unlock Achievements
async function checkAndUnlockAchievements(userId) {
  try {
    const [user] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (user.length === 0) return;

    const userData = user[0];
    const unlockedAchievements = [];

    // Get all achievements not yet unlocked
    const [achievements] = await pool.query(
      `SELECT a.* FROM achievements a
       WHERE a.id NOT IN (
         SELECT achievement_id FROM user_achievements WHERE user_id = ?
       )`,
      [userId]
    );

    for (const achievement of achievements) {
      let shouldUnlock = false;

      switch (achievement.requirement_type) {
        case 'quizzes_taken':
          shouldUnlock = userData.quizzes_taken >= achievement.requirement_value;
          break;
        case 'total_score':
          shouldUnlock = userData.total_score >= achievement.requirement_value;
          break;
        case 'streak':
          shouldUnlock = userData.current_streak >= achievement.requirement_value;
          break;
        case 'perfect_score':
          const [perfectScores] = await pool.query(
            'SELECT COUNT(*) as count FROM scores WHERE user_id = ? AND score = 100',
            [userId]
          );
          shouldUnlock = perfectScores[0].count >= achievement.requirement_value;
          break;
      }

      if (shouldUnlock) {
        await pool.query(
          'INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)',
          [userId, achievement.id]
        );
        
        // Award XP and coins
        await pool.query(
          'UPDATE users SET xp_points = xp_points + ?, coins = coins + ? WHERE id = ?',
          [achievement.xp_reward, achievement.coin_reward, userId]
        );

        unlockedAchievements.push(achievement);
      }
    }

    return unlockedAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
}

// Enhanced Quiz Submission with XP, Achievements, and Streaks
app.post('/api/quiz/submit-enhanced', authenticateToken, async (req, res) => {
  try {
    const { categoryId, difficulty, answers, timeTaken } = req.body;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Get correct answers
    const questionIds = answers.map(a => a.questionId);
    const [correctAnswers] = await pool.query(
      `SELECT id, correct_answer, explanation FROM questions WHERE id IN (?)`,
      [questionIds]
    );

    // Calculate score
    let score = 0;
    const results = answers.map(answer => {
      const correct = correctAnswers.find(q => q.id === answer.questionId);
      const isCorrect = correct && answer.selectedAnswer === correct.correct_answer;
      if (isCorrect) score++;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: correct?.correct_answer,
        isCorrect,
        explanation: correct?.explanation
      };
    });

    const totalQuestions = answers.length;
    const scorePercentage = Math.round((score / totalQuestions) * 100);

    // Calculate XP and coins
    const baseXP = scorePercentage;
    const difficultyMultiplier = difficulty === 'easy' ? 1.0 : difficulty === 'medium' ? 1.5 : 2.0;
    const timeBonus = timeTaken < 60 ? 50 : timeTaken < 120 ? 30 : timeTaken < 180 ? 15 : 0;
    const speedBonus = timeTaken < 120 ? 25 : timeTaken < 180 ? 15 : 0;
    const xpEarned = Math.round(baseXP * difficultyMultiplier) + timeBonus;
    const coinsEarned = Math.round(xpEarned / 2);

    // Update streak
    const [userStreak] = await pool.query(
      'SELECT last_quiz_date, current_streak FROM users WHERE id = ?',
      [userId]
    );

    let newStreak = 1;
    const today = new Date().toISOString().split('T')[0];
    const lastQuizDate = userStreak[0].last_quiz_date;

    if (lastQuizDate) {
      const lastDate = new Date(lastQuizDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day, keep current streak
        newStreak = userStreak[0].current_streak;
      } else if (diffDays === 1) {
        // Consecutive day, increment streak
        newStreak = userStreak[0].current_streak + 1;
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }
    }

    // Save score
    await pool.query(
      `INSERT INTO scores (user_id, category_id, difficulty, score, total_questions, time_taken, xp_earned, coins_earned, speed_bonus) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, categoryId, difficulty, scorePercentage, totalQuestions, timeTaken, xpEarned, coinsEarned, speedBonus]
    );

    // Update user stats
    const newXP = await pool.query(
      `UPDATE users 
       SET total_score = total_score + ?, 
           quizzes_taken = quizzes_taken + 1,
           xp_points = xp_points + ?,
           coins = coins + ?,
           current_streak = ?,
           longest_streak = GREATEST(longest_streak, ?),
           last_quiz_date = ?
       WHERE id = ?`,
      [scorePercentage, xpEarned, coinsEarned, newStreak, newStreak, today, userId]
    );

    // Calculate new level (every 500 XP = 1 level)
    const [updatedUser] = await pool.query(
      'SELECT xp_points FROM users WHERE id = ?',
      [userId]
    );
    const newLevel = Math.floor(updatedUser[0].xp_points / 500) + 1;
    await pool.query('UPDATE users SET level = ? WHERE id = ?', [newLevel, userId]);

    // Check for new achievements
    const unlockedAchievements = await checkAndUnlockAchievements(userId);

    res.json({
      score: scorePercentage,
      correctAnswers: score,
      totalQuestions,
      results,
      xpEarned,
      coinsEarned,
      speedBonus,
      newStreak,
      newLevel,
      unlockedAchievements
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// Get Daily Challenge
app.get('/api/daily-challenge', authenticateToken, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get or create today's challenge
    let [challenge] = await pool.query(
      `SELECT dc.*, c.name as category_name, c.icon as category_icon
       FROM daily_challenges dc
       JOIN categories c ON dc.category_id = c.id
       WHERE dc.challenge_date = ?`,
      [today]
    );

    if (challenge.length === 0) {
      // Create new daily challenge
      const [categories] = await pool.query('SELECT id FROM categories ORDER BY RAND() LIMIT 1');
      const difficulties = ['easy', 'medium', 'hard'];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

      await pool.query(
        'INSERT INTO daily_challenges (challenge_date, category_id, difficulty) VALUES (?, ?, ?)',
        [today, categories[0].id, randomDifficulty]
      );

      [challenge] = await pool.query(
        `SELECT dc.*, c.name as category_name, c.icon as category_icon
         FROM daily_challenges dc
         JOIN categories c ON dc.category_id = c.id
         WHERE dc.challenge_date = ?`,
        [today]
      );
    }

    // Check if user completed today's challenge
    const [completion] = await pool.query(
      'SELECT * FROM challenge_completions WHERE user_id = ? AND challenge_id = ?',
      [req.user.id, challenge[0].id]
    );

    res.json({
      ...challenge[0],
      completed: completion.length > 0,
      completionScore: completion.length > 0 ? completion[0].score : null
    });
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    res.status(500).json({ error: 'Failed to fetch daily challenge' });
  }
});

// Toggle Dark Mode
app.post('/api/user/toggle-dark-mode', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      'UPDATE users SET dark_mode = NOT dark_mode WHERE id = ?',
      [req.user.id]
    );

    const [user] = await pool.query(
      'SELECT dark_mode FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ darkMode: user[0].dark_mode });
  } catch (error) {
    console.error('Error toggling dark mode:', error);
    res.status(500).json({ error: 'Failed to toggle dark mode' });
  }
});

// Get XP Leaderboard
app.get('/api/leaderboard/xp', authenticateToken, async (req, res) => {
  try {
    const [leaderboard] = await pool.query(
      `SELECT 
        u.id,
        u.username,
        u.avatar,
        u.xp_points,
        u.level,
        u.current_streak,
        COUNT(DISTINCT ua.achievement_id) as achievements_count,
        RANK() OVER (ORDER BY u.xp_points DESC) as rank_position
       FROM users u
       LEFT JOIN user_achievements ua ON u.id = ua.user_id
       WHERE u.quizzes_taken > 0
       GROUP BY u.id
       ORDER BY u.xp_points DESC
       LIMIT 100`
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching XP leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});
// ============================================
// ADMIN ROUTES - Add these to server.js
// ============================================

// Admin password (CHANGE THIS!)
const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

// Simple admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['x-admin-password'];
  
  if (authHeader === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized - Invalid admin password' });
  }
};

// Get all users (Admin only)
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT 
        id,
        username,
        email,
        level,
        xp_points,
        coins,
        total_score,
        quizzes_taken,
        current_streak,
        longest_streak,
        created_at,
        last_login
       FROM users
       ORDER BY created_at DESC`
    );

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user statistics (Admin only)
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    // Total users
    const [totalUsers] = await pool.query('SELECT COUNT(*) as count FROM users');
    
    // New users today
    const [newUsersToday] = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()'
    );
    
    // Total quizzes taken
    const [totalQuizzes] = await pool.query('SELECT COUNT(*) as count FROM scores');
    
    // Active users (logged in last 7 days)
    const [activeUsers] = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    // Top 5 users by XP
    const [topUsers] = await pool.query(
      'SELECT username, xp_points, level FROM users ORDER BY xp_points DESC LIMIT 5'
    );

    // Quiz activity by category
    const [categoryActivity] = await pool.query(
      `SELECT c.name, COUNT(s.id) as quiz_count
       FROM scores s
       JOIN categories c ON s.category_id = c.id
       GROUP BY c.id, c.name
       ORDER BY quiz_count DESC`
    );

    // Recent signups (last 10)
    const [recentSignups] = await pool.query(
      `SELECT username, email, created_at
       FROM users
       ORDER BY created_at DESC
       LIMIT 10`
    );

    res.json({
      totalUsers: totalUsers[0].count,
      newUsersToday: newUsersToday[0].count,
      totalQuizzes: totalQuizzes[0].count,
      activeUsers: activeUsers[0].count,
      topUsers,
      categoryActivity,
      recentSignups
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get specific user details (Admin only)
app.get('/api/admin/users/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // User info
    const [users] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // User's quiz history
    const [quizHistory] = await pool.query(
      `SELECT s.*, c.name as category_name
       FROM scores s
       JOIN categories c ON s.category_id = c.id
       WHERE s.user_id = ?
       ORDER BY s.timestamp DESC`,
      [userId]
    );

    // User's achievements
    const [achievements] = await pool.query(
      `SELECT a.name, a.icon, ua.unlocked_at
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.id
       WHERE ua.user_id = ?
       ORDER BY ua.unlocked_at DESC`,
      [userId]
    );

    res.json({
      user: users[0],
      quizHistory,
      achievements
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Delete user (Admin only)
app.delete('/api/admin/users/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    await pool.query('DELETE FROM users WHERE id = ?', [userId]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get all quiz submissions (Admin only)
app.get('/api/admin/quiz-submissions', authenticateAdmin, async (req, res) => {
  try {
    const [submissions] = await pool.query(
      `SELECT 
        s.*,
        u.username,
        c.name as category_name
       FROM scores s
       JOIN users u ON s.user_id = u.id
       JOIN categories c ON s.category_id = c.id
       ORDER BY s.timestamp DESC
       LIMIT 100`
    );

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:5000/api`);
});