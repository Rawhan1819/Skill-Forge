# 🚀 Skill Forge - Interactive Learning Platform

<div align="center">

![Skill Forge Logo](https://img.shields.io/badge/Skill-Forge-indigo?style=for-the-badge&logo=bookstack)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**A gamified quiz platform with XP system, achievements, streaks, and real-time leaderboards**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Admin Panel](#-admin-panel) • [API Docs](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Admin Panel](#-admin-panel)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About The Project

**Skill Forge** is a modern, full-stack interactive learning platform that makes education engaging through gamification. Users can test their knowledge across multiple subjects, earn experience points, unlock achievements, maintain daily streaks, and compete on global leaderboards.

### Why Skill Forge?

- 🎮 **Gamified Learning** - XP, levels, coins, and achievements keep users motivated
- 📊 **8 Diverse Categories** - Mathematics, Science, Social Studies, General Knowledge, Python, JavaScript, Java, C++
- ⚡ **Speed Bonuses** - Faster quiz completion = more rewards
- 🔥 **Daily Streaks** - Build consistent learning habits
- 🏆 **Global Competition** - Compete with learners worldwide
- 📈 **Progress Tracking** - Detailed analytics and performance insights
- 🌙 **Dark Mode** - Comfortable learning day or night
- 💯 **500+ Questions** - Expanding question bank across 3 difficulty levels

---

## ✨ Features

### 🎓 Learning Features
- **Multi-Category Quizzes** - 8 subjects with 100+ questions each
- **Three Difficulty Levels** - Easy, Medium, Hard with XP multipliers
- **Real-Time Timer** - Track your quiz completion speed
- **Instant Feedback** - See correct answers and explanations
- **Randomized Questions** - Different questions every attempt

### 🎮 Gamification
- **XP & Level System** - Earn experience points and level up
- **Achievement Badges** - 15 unlockable achievements
- **Coins & Rewards** - Earn virtual currency for performance
- **Daily Challenges** - Complete daily tasks for bonus rewards
- **Streak System** - Maintain learning consistency with daily streaks

### 📊 Analytics
- **Personal Dashboard** - View stats, achievements, and progress
- **Performance Graphs** - Track improvement over time
- **Category Breakdown** - See strengths and weaknesses
- **Quiz History** - Review all past attempts

### 🏆 Competition
- **Global Leaderboard** - Ranked by XP, level, and achievements
- **Category Rankings** - Compete in specific subjects
- **Friend Challenges** - Challenge other learners (coming soon)

### 🎨 User Experience
- **Modern UI/UX** - Clean, professional design
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Fast Loading** - Optimized performance

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework for dynamic interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Client-side state persistence

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimal web framework
- **MySQL** - Relational database for data storage
- **JWT** - Secure authentication with JSON Web Tokens
- **bcrypt** - Password hashing for security

### Tools & Libraries
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **mysql2** - MySQL client with promise support

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or higher) - [Download](https://www.mysql.com/downloads/)
- **Git** (optional) - [Download](https://git-scm.com/)

### Check Installations

```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
mysql --version # Should show 8.0.0 or higher
```

---

## 📥 Installation

### Step 1: Clone or Download Project

```bash
# Option A: Clone with Git
git clone https://github.com/yourusername/skill-forge.git
cd skill-forge

# Option B: Create project manually
mkdir skill-forge
cd skill-forge
mkdir backend frontend database admin
```

### Step 2: Backend Setup

```bash
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mysql2 bcrypt jsonwebtoken cors dotenv
npm install --save-dev nodemon

# Create server.js (copy from artifacts provided)
# Create .env file
touch .env
```

**Configure `.env` file:**

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=quiz_platform
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:3000
ADMIN_PASSWORD=your_admin_password_here
```

**Update `package.json` scripts:**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 3: Frontend Setup

```bash
cd ../frontend

# Create React app
npx create-react-app .

# Install additional dependencies
npm install lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure `tailwind.config.js`:**

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Update `src/index.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Replace `src/App.js` with the complete React application code (from artifacts)**

---

## 🗄️ Database Setup

### Step 1: Start MySQL

```bash
# Ubuntu/Linux
sudo systemctl start mysql

# macOS
brew services start mysql

# Windows
net start MySQL80
```

### Step 2: Create Database

```bash
# Login to MySQL
mysql -u root -p

# Inside MySQL prompt:
CREATE DATABASE quiz_platform;
USE quiz_platform;
```

### Step 3: Import Schema

```sql
-- Copy and paste the entire database schema from artifacts
-- Or import from file:
```

```bash
mysql -u root -p quiz_platform < database/schema.sql
```

### Step 4: Verify Database

```sql
-- Show all tables
SHOW TABLES;

-- Should display:
-- categories
-- questions
-- scores
-- users
-- user_progress
-- achievements
-- user_achievements
-- daily_challenges
-- challenge_completions

-- Check sample data
SELECT * FROM categories;
SELECT COUNT(*) as question_count FROM questions;

-- Exit
EXIT;
```

### Step 5: Add Sample Questions (Optional)

```bash
cd database
mysql -u root -p quiz_platform < add_more_questions.sql
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📊 API endpoints available at http://localhost:5000/api
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
```

### Open in Browser

Your browser should automatically open to `http://localhost:3000`

If not, manually visit: **http://localhost:3000**

---

## 👤 User Guide

### Creating an Account

1. Visit `http://localhost:3000`
2. Click **"Get Started - Sign Up / Login"**
3. Click **"Sign Up"** tab
4. Enter:
   - Username
   - Email
   - Password (min 6 characters)
5. Click **"Sign Up"**
6. You'll be redirected to the Dashboard

### Taking a Quiz

1. From Dashboard, click **"Quizzes"** in navigation
2. Select a category (e.g., Mathematics)
3. Choose difficulty (Easy, Medium, or Hard)
4. Answer all 10 questions
5. Click **"Submit Quiz"**
6. View your results, XP earned, and achievements unlocked

### Viewing Progress

1. Click **"Dashboard"** to see:
   - Current Level & XP
   - Daily Streak 🔥
   - Achievements unlocked
   - Daily Challenge
2. Click **"Profile"** to see:
   - Quiz history
   - Performance breakdown
   - Total stats

### Earning Rewards

- **Base XP:** Score percentage (0-100 XP)
- **Difficulty Multiplier:**
  - Easy: 1.0x
  - Medium: 1.5x
  - Hard: 2.0x
- **Speed Bonus:**
  - Under 60s: +50 XP
  - Under 120s: +30 XP
  - Under 180s: +15 XP
- **Coins:** Half of XP earned
- **Level Up:** Every 500 XP

---

## 👨‍💼 Admin Panel

### Accessing Admin Dashboard

### Step 1: Open Admin Panel

```bash
# Navigate to admin folder
cd ~/Desktop/Skill-Forge/admin

# Open admin.html in browser
xdg-open admin.html

# Or manually: file:///path/to/skill-forge/admin/admin.html
```

### Step 2: Login

**Default Credentials:**
- Password: `admin123`

**⚠️ IMPORTANT:** Change the password in `backend/server.js`:

```javascript
const ADMIN_PASSWORD = 'your_secure_password';
```

### Admin Features

#### 📊 Dashboard Tab
- **Total Users** - Count of registered users
- **New Users Today** - Today's signups
- **Total Quizzes** - All quiz attempts
- **Active Users** - Users active in last 7 days
- **Top Users by XP** - Leaderboard preview
- **Category Activity** - Popular quiz categories
- **Recent Signups** - Last 10 new users

#### 👥 Users Tab
- **View All Users** - Complete user list
- **Search Users** - Filter by username/email
- **User Details:**
  - ID, Username, Email
  - Level, XP Points
  - Quizzes Taken
  - Current Streak
  - Join Date
- **View Individual User** - Click "View" for detailed info

#### 📝 Submissions Tab
- **All Quiz Attempts** - Recent submissions
- **Details Shown:**
  - Username
  - Category
  - Difficulty Level
  - Score Achieved
  - XP Earned
  - Time Taken
  - Submission Date/Time

### Admin SQL Queries

#### View All Users
```sql
mysql -u root -p
USE quiz_platform;

SELECT 
    id, username, email, level, xp_points, 
    quizzes_taken, current_streak, created_at
FROM users
ORDER BY created_at DESC;
```

#### Find Specific User
```sql
-- By username
SELECT * FROM users WHERE username = 'johndoe';

-- By email
SELECT * FROM users WHERE email = 'john@example.com';
```

#### User Activity Stats
```sql
-- Active users today
SELECT COUNT(*) FROM users WHERE DATE(last_login) = CURDATE();

-- New signups this week
SELECT COUNT(*) FROM users 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Top 10 by XP
SELECT username, level, xp_points 
FROM users 
ORDER BY xp_points DESC 
LIMIT 10;
```

#### Category Analytics
```sql
SELECT 
    c.name,
    COUNT(s.id) as quiz_count,
    AVG(s.score) as avg_score
FROM scores s
JOIN categories c ON s.category_id = c.id
GROUP BY c.id, c.name
ORDER BY quiz_count DESC;
```

#### Export User Data
```bash
# Export to text file
mysql -u root -p -e "SELECT * FROM users" quiz_platform > users_export.txt

# Export to CSV
mysql -u root -p quiz_platform -e "SELECT * FROM users" | sed 's/\t/,/g' > users.csv
```

---

## 📁 Project Structure

```
skill-forge/
│
├── backend/
│   ├── server.js                 # Express server with all routes
│   ├── .env                      # Environment variables (DO NOT COMMIT)
│   ├── package.json              # Backend dependencies
│   ├── questionImporter.js       # Bulk question import script
│   └── node_modules/             # Installed packages
│
├── frontend/
│   ├── public/
│   │   ├── index.html            # HTML template
│   │   └── favicon.ico           # App icon
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Tailwind CSS imports
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── node_modules/             # Installed packages
│
├── database/
│   ├── schema.sql                # Database schema
│   ├── add_more_questions.sql    # Additional questions
│   └── enhanced_features.sql     # Enhanced features schema
│
├── admin/
│   └── admin.html                # Admin dashboard
│
├── README.md                     # This file
├── .gitignore                    # Git ignore rules
└── LICENSE                       # MIT License

```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Quiz Endpoints

#### Get Categories
```http
GET /api/categories
Authorization: Bearer <token>

Response: [{ id, name, description, icon }]
```

#### Get Quiz Questions
```http
GET /api/quiz/:categoryId/:difficulty?limit=10
Authorization: Bearer <token>

Response: [{ id, question, option_a, option_b, option_c, option_d }]
```

#### Submit Quiz
```http
POST /api/quiz/submit-enhanced
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": 1,
  "difficulty": "medium",
  "answers": [
    { "questionId": 1, "selectedAnswer": "A" }
  ],
  "timeTaken": 120
}

Response: { score, xpEarned, coinsEarned, newStreak, unlockedAchievements, results }
```

### User Endpoints

#### Get User Analytics
```http
GET /api/user/analytics
Authorization: Bearer <token>

Response: { level, xp_points, current_streak, categoryStats, recentPerformance }
```

#### Get Achievements
```http
GET /api/user/achievements
Authorization: Bearer <token>

Response: [{ id, name, icon, unlocked, unlocked_at }]
```

#### Get Daily Challenge
```http
GET /api/daily-challenge
Authorization: Bearer <token>

Response: { category_name, difficulty, bonus_xp, completed }
```

### Leaderboard Endpoints

#### Get XP Leaderboard
```http
GET /api/leaderboard/xp
Authorization: Bearer <token>

Response: [{ username, level, xp_points, rank_position }]
```

### Admin Endpoints

#### Get All Users (Admin)
```http
GET /api/admin/users
x-admin-password: your_admin_password

Response: [{ id, username, email, level, xp_points, ... }]
```

#### Get Admin Statistics (Admin)
```http
GET /api/admin/stats
x-admin-password: your_admin_password

Response: { totalUsers, newUsersToday, totalQuizzes, topUsers, ... }
```

---

## 🗃️ Database Schema

### Main Tables

#### `users`
Stores user account information and statistics
```sql
id, username, email, password_hash, level, xp_points, coins,
total_score, quizzes_taken, current_streak, longest_streak,
last_quiz_date, dark_mode, avatar, created_at, last_login
```

#### `categories`
Quiz categories
```sql
id, name, description, icon, created_at
```

#### `questions`
Quiz questions with answers
```sql
id, category_id, difficulty, question, option_a, option_b, 
option_c, option_d, correct_answer, explanation, created_at
```

#### `scores`
User quiz submissions
```sql
id, user_id, category_id, difficulty, score, total_questions,
time_taken, xp_earned, coins_earned, speed_bonus, timestamp
```

#### `achievements`
Available achievements
```sql
id, name, description, icon, requirement_type, requirement_value,
xp_reward, coin_reward, created_at
```

#### `user_achievements`
Unlocked user achievements
```sql
id, user_id, achievement_id, unlocked_at
```

#### `daily_challenges`
Daily challenge configuration
```sql
id, challenge_date, category_id, difficulty, bonus_xp, bonus_coins
```

---

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
- Professional hero section
- Feature highlights
- Category preview
- Testimonials

### Dashboard
![Dashboard](screenshots/dashboard.png)
- Level, XP, Streak, Achievements
- Daily Challenge card
- Performance overview

### Quiz Interface
![Quiz](screenshots/quiz.png)
- Real-time timer
- Progress bar
- Multiple choice questions
- Speed indicators

### Results Screen
![Results](screenshots/results.png)
- Score display
- XP & coins earned
- New achievements unlocked
- Answer review with explanations

### Leaderboard
![Leaderboard](screenshots/leaderboard.png)
- Global rankings
- Level & XP display
- Streak indicators
- Achievement counts

### Achievements
![Achievements](screenshots/achievements.png)
- Badge collection
- Locked/unlocked status
- Reward information
- Progress tracking

### Admin Dashboard
![Admin](screenshots/admin.png)
- User statistics
- Activity monitoring
- Quiz submissions
- User management

---

## 🐛 Troubleshooting

### Common Issues

#### MySQL Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
```bash
# Start MySQL service
sudo systemctl start mysql  # Linux
brew services start mysql   # macOS
net start MySQL80          # Windows
```

#### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
# Or change PORT in .env file
```

#### Frontend Not Loading
**Solution:**
1. Check backend is running on port 5000
2. Verify `API_BASE_URL` in App.js is correct
3. Check browser console for errors
4. Clear browser cache

#### Can't Login to Admin Panel
**Solution:**
1. Verify backend is running
2. Check `ADMIN_PASSWORD` in server.js
3. Ensure admin.html `API_URL` is correct
4. Check browser console for errors

---

## 🚀 Deployment

### Production Checklist

- [ ] Change JWT_SECRET to secure random string
- [ ] Change ADMIN_PASSWORD to secure password
- [ ] Set NODE_ENV=production
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure CORS for production domain
- [ ] Implement rate limiting
- [ ] Set up error logging (Sentry)
- [ ] Configure monitoring (New Relic)

### Deployment Options

#### Option 1: Vercel (Frontend) + Railway (Backend)
```bash
# Frontend
cd frontend
vercel --prod

# Backend
cd backend
railway up
```

#### Option 2: Heroku (Full Stack)
```bash
heroku create skill-forge
heroku addons:create cleardb:ignite
git push heroku main
```

#### Option 3: AWS (EC2 + RDS + S3)
- Deploy backend on EC2
- Host database on RDS
- Serve frontend from S3 + CloudFront

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow existing code formatting
- Add comments for complex logic
- Write meaningful commit messages
- Test all changes before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [MySQL](https://www.mysql.com/) - Database

---

## 📞 Support

If you have any questions or need help:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [API Documentation](#-api-documentation)
3. Open an [Issue](https://github.com/yourusername/skill-forge/issues)
4. Email: support@skillforge.com

---

## 🗺️ Roadmap

### Version 1.1 (Coming Soon)
- [ ] Mobile app (React Native)
- [ ] Friend challenges
- [ ] Custom quiz creation
- [ ] Video explanations
- [ ] AI-powered recommendations

### Version 2.0 (Future)
- [ ] Multiplayer quiz battles
- [ ] Voice-over questions
- [ ] AR learning experiences
- [ ] Offline mode
- [ ] Multi-language support

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by developers, for learners

[Report Bug](https://github.com/yourusername/skill-forge/issues) • [Request Feature](https://github.com/yourusername/skill-forge/issues)

</div>