// API Testing Suite for Quiz Platform
// Run with: npm test

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

// Update this URL based on your environment
const API_URL = process.env.API_URL || 'http://localhost:5000';
const api = chai.request(API_URL);

// Test data
const testUser = {
  username: 'testuser_' + Date.now(),
  email: 'test_' + Date.now() + '@example.com',
  password: 'Test123456'
};

let authToken = '';
let userId = '';

describe('Quiz Platform API Tests', () => {
  
  // ========================================
  // Authentication Tests
  // ========================================
  
  describe('Authentication', () => {
    
    it('should register a new user', (done) => {
      api
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('username', testUser.username);
          expect(res.body.user).to.have.property('email', testUser.email);
          authToken = res.body.token;
          userId = res.body.user.id;
          done();
        });
    });

    it('should not register user with existing email', (done) => {
      api
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not register user with short password', (done) => {
      api
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@example.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should login with valid credentials', (done) => {
      api
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          done();
        });
    });

    it('should not login with invalid password', (done) => {
      api
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not login with non-existent email', (done) => {
      api
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  // ========================================
  // Category Tests
  // ========================================
  
  describe('Categories', () => {
    
    it('should not get categories without token', (done) => {
      api
        .get('/api/categories')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should get all categories with valid token', (done) => {
      api
        .get('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('description');
          done();
        });
    });
  });

  // ========================================
  // Quiz Tests
  // ========================================
  
  describe('Quiz', () => {
    
    let categoryId = 1;
    let questionIds = [];

    it('should get quiz questions with valid parameters', (done) => {
      api
        .get(`/api/quiz/${categoryId}/easy?limit=5`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.lessThanOrEqual(5);
          
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('question');
            expect(res.body[0]).to.have.property('option_a');
            expect(res.body[0]).to.have.property('option_b');
            expect(res.body[0]).to.have.property('option_c');
            expect(res.body[0]).to.have.property('option_d');
            expect(res.body[0]).to.not.have.property('correct_answer');
            
            // Store question IDs for submission test
            questionIds = res.body.map(q => q.id);
          }
          done();
        });
    });

    it('should not get questions without authentication', (done) => {
      api
        .get(`/api/quiz/${categoryId}/easy`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should submit quiz answers and get results', (done) => {
      if (questionIds.length === 0) {
        console.log('Skipping: No questions available');
        return done();
      }

      const answers = questionIds.map(id => ({
        questionId: id,
        selectedAnswer: 'A'
      }));

      api
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          categoryId: categoryId,
          difficulty: 'easy',
          answers: answers,
          timeTaken: 120
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('score');
          expect(res.body).to.have.property('correctAnswers');
          expect(res.body).to.have.property('totalQuestions');
          expect(res.body).to.have.property('results');
          expect(res.body.results).to.be.an('array');
          expect(res.body.totalQuestions).to.equal(answers.length);
          done();
        });
    });

    it('should not submit quiz without authentication', (done) => {
      api
        .post('/api/quiz/submit')
        .send({
          categoryId: 1,
          difficulty: 'easy',
          answers: [{ questionId: 1, selectedAnswer: 'A' }],
          timeTaken: 60
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should not submit quiz with invalid data', (done) => {
      api
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          categoryId: 1,
          difficulty: 'easy',
          answers: 'invalid_format',
          timeTaken: 60
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // ========================================
  // User Profile Tests
  // ========================================
  
  describe('User Profile', () => {
    
    it('should get user profile with valid token', (done) => {
      api
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('username', testUser.username);
          expect(res.body).to.have.property('email', testUser.email);
          expect(res.body).to.have.property('total_score');
          expect(res.body).to.have.property('quizzes_taken');
          done();
        });
    });

    it('should not get profile without token', (done) => {
      api
        .get('/api/user/profile')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should get user score history', (done) => {
      api
        .get('/api/user/scores')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // ========================================
  // Leaderboard Tests
  // ========================================
  
  describe('Leaderboard', () => {
    
    it('should get global leaderboard', (done) => {
      api
        .get('/api/leaderboard')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('username');
            expect(res.body[0]).to.have.property('total_score');
            expect(res.body[0]).to.have.property('quizzes_taken');
            
            // Verify descending order
            for (let i = 1; i < res.body.length; i++) {
              expect(res.body[i-1].total_score).to.be.at.least(res.body[i].total_score);
            }
          }
          done();
        });
    });

    it('should get category leaderboard', (done) => {
      api
        .get('/api/leaderboard/category/1')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should not get leaderboard without token', (done) => {
      api
        .get('/api/leaderboard')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  // ========================================
  // Edge Cases and Security Tests
  // ========================================
  
  describe('Security and Edge Cases', () => {
    
    it('should reject invalid JWT token', (done) => {
      api
        .get('/api/categories')
        .set('Authorization', 'Bearer invalid_token_here')
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('should handle SQL injection attempt', (done) => {
      api
        .post('/api/auth/login')
        .send({
          email: "' OR '1'='1",
          password: "' OR '1'='1"
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should handle missing required fields', (done) => {
      api
        .post('/api/auth/register')
        .send({
          username: 'testuser'
          // missing email and password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should handle invalid category ID', (done) => {
      api
        .get('/api/quiz/99999/easy')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should handle invalid difficulty level', (done) => {
      api
        .get('/api/quiz/1/invalid_difficulty')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          // Should either return 404 or empty array
          expect([404, 200]).to.include(res.status);
          done();
        });
    });
  });

  // ========================================
  // Performance Tests
  // ========================================
  
  describe('Performance', () => {
    
    it('should respond to category request within 500ms', (done) => {
      const start = Date.now();
      api
        .get('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          const duration = Date.now() - start;
          expect(duration).to.be.lessThan(500);
          done();
        });
    });

    it('should handle multiple concurrent requests', (done) => {
      const requests = [];
      for (let i = 0; i < 10; i++) {
        requests.push(
          api
            .get('/api/categories')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      Promise.all(requests)
        .then(responses => {
          responses.forEach(res => {
            expect(res).to.have.status(200);
          });
          done();
        })
        .catch(err => done(err));
    });
  });
});

// Export for use in other test files
module.exports = { testUser, authToken };