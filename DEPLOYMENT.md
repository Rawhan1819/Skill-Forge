# 🚀 Deployment Guide - Quiz Platform

This guide covers deploying your Quiz Platform to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All features work correctly in development
- ✅ Environment variables are properly configured
- ✅ Database is populated with questions
- ✅ API endpoints are tested
- ✅ Frontend build runs without errors
- ✅ Security best practices are implemented

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + Database)

**Best for:** Quick deployment with minimal configuration

#### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   ```

3. **Add MySQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "MySQL"
   - Note the connection details

4. **Configure Environment Variables**
   - In Railway dashboard, go to your backend service
   - Add environment variables:
   ```
   NODE_ENV=production
   DB_HOST=<railway-mysql-host>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=railway
   JWT_SECRET=<your-secure-secret>
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.up.railway.app`

#### Step 2: Deploy Frontend to Vercel

1. **Prepare Frontend**
   ```bash
   cd frontend
   
   # Update API_BASE_URL in src/App.js
   # Change from http://localhost:5000/api
   # To https://your-railway-app.up.railway.app/api
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   
   # Follow prompts
   # For production: vercel --prod
   ```

3. **Configure Environment Variables (if needed)**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Add any frontend-specific variables

---

### Option 2: Heroku (Full Stack)

**Best for:** All-in-one deployment

#### Step 1: Prepare Application

1. **Create `Procfile` in root:**
   ```
   web: cd backend && npm start
   ```

2. **Update package.json in root:**
   ```json
   {
     "name": "quiz-platform",
     "version": "1.0.0",
     "scripts": {
       "start": "cd backend && npm start",
       "build": "cd frontend && npm run build",
       "heroku-postbuild": "cd frontend && npm install && npm run build"
     }
   }
   ```

3. **Update server.js to serve React build:**
   ```javascript
   // Add this after your API routes
   const path = require('path');
   
   if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../frontend/build')));
     
     app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
     });
   }
   ```

#### Step 2: Deploy to Heroku

```bash
# Install Heroku CLI
# Windows: Download from heroku.com
# Mac: brew tap heroku/brew && brew install heroku
# Linux: curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create quiz-platform-app

# Add MySQL addon
heroku addons:create cleardb:ignite

# Get database URL
heroku config:get CLEARDB_DATABASE_URL

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secure-secret-here

# Deploy
git add .
git commit -m "Prepare for deployment"
git push heroku main

# Open app
heroku open
```

---

### Option 3: AWS (Full Control)

**Best for:** Production-grade applications with custom requirements

#### Components:
- **EC2** - Backend server
- **RDS** - MySQL database
- **S3 + CloudFront** - Frontend hosting

#### Step 1: Setup RDS Database

1. Create RDS MySQL instance
2. Configure security groups
3. Note connection details
4. Import schema using MySQL Workbench

#### Step 2: Setup EC2 Instance

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL client
sudo apt install mysql-client

# Clone your repository
git clone your-repo-url
cd quiz-platform/backend

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Create .env file with production values
nano .env

# Start application
pm2 start server.js --name quiz-api

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Step 3: Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/quiz-platform
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/quiz-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 4: Deploy Frontend to S3

```bash
cd frontend

# Build for production
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://quiz-platform-frontend

# Enable static website hosting
aws s3 website s3://quiz-platform-frontend --index-document index.html

# Upload build
aws s3 sync build/ s3://quiz-platform-frontend --acl public-read

# Setup CloudFront for CDN (optional but recommended)
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
```bash
# Never commit .env files
# Use different secrets for production
# Rotate secrets regularly
```

### 2. HTTPS/SSL
```bash
# Use Let's Encrypt for free SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 3. Rate Limiting
```javascript
// Add to server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. CORS Configuration
```javascript
// Restrict CORS in production
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 5. SQL Injection Prevention
```javascript
// Always use parameterized queries (already implemented)
// Never concatenate user input into SQL strings
```

---

## 📊 Monitoring & Maintenance

### 1. Logging

```javascript
// Add logging middleware
const morgan = require('morgan');
app.use(morgan('combined'));

// Log errors
console.error('Error:', error);
```

### 2. Database Backups

```bash
# Automated daily backups
# Railway/Heroku have built-in backup solutions

# Manual backup
mysqldump -u username -p quiz_platform > backup.sql

# Restore
mysql -u username -p quiz_platform < backup.sql
```

### 3. Monitoring Services

- **New Relic** - Application performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Uptime Robot** - Uptime monitoring

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Errors
```javascript
// Solution: Update CORS origin in production
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Issue 2: Database Connection Timeouts
```javascript
// Solution: Increase connection pool size
const pool = mysql.createPool({
  connectionLimit: 20,
  acquireTimeout: 60000
});
```

### Issue 3: Build Failures
```bash
# Solution: Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 4: Environment Variables Not Loading
```bash
# Solution: Check .env file location and format
# Ensure no spaces around = sign
# No quotes needed for values
```

---

## 📈 Performance Optimization

### 1. Database Indexes
```sql
-- Already implemented in schema
CREATE INDEX idx_scores_user ON scores(user_id);
CREATE INDEX idx_questions_category_difficulty 
ON questions(category_id, difficulty);
```

### 2. Frontend Optimization
```bash
# Enable production build optimizations
npm run build

# Use CDN for static assets
# Implement lazy loading
# Optimize images
```

### 3. Caching
```javascript
// Add Redis for caching (optional)
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
app.get('/api/categories', async (req, res) => {
  const cached = await client.get('categories');
  if (cached) return res.json(JSON.parse(cached));
  
  // Fetch from database
  const data = await fetchCategories();
  await client.setex('categories', 3600, JSON.stringify(data));
  res.json(data);
});
```

### 4. CDN Integration
```javascript
// For images and static assets
// Use Cloudinary for images
// Use CloudFront for AWS deployments
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: cd backend && npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --browserless
          cd backend && railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend
```

---

## 📱 Post-Deployment Checklist

After deployment, verify:

- [ ] All API endpoints are accessible
- [ ] Database connections work
- [ ] User registration and login function
- [ ] Quizzes load and submit correctly
- [ ] Leaderboard displays properly
- [ ] SSL certificate is valid
- [ ] CORS is properly configured
- [ ] Error logging is working
- [ ] Backups are scheduled
- [ ] Monitoring is active
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable

---

## 🔍 Testing Production Environment

```bash
# Test API endpoints
curl https://your-api.com/api/categories

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-api.com/api/user/profile

# Load testing with Apache Bench
ab -n 1000 -c 10 https://your-api.com/api/categories

# Or use k6 for load testing
k6 run loadtest.js
```

### Load Test Script (loadtest.js)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  let response = http.get('https://your-api.com/api/categories');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

---

## 💰 Cost Estimation

### Free Tier Options
- **Frontend:** Vercel (Free tier: 100GB bandwidth)
- **Backend:** Railway (Free tier: $5/month credit)
- **Database:** Railway MySQL (included in free tier)
- **Monitoring:** New Relic (Free tier available)

**Estimated Monthly Cost:** $0 - $10/month for small applications

### Production Scale
- **Frontend (Vercel Pro):** $20/month
- **Backend (Railway):** $10-50/month depending on usage
- **Database (Railway or AWS RDS):** $15-100/month
- **Additional Services:** $20/month

**Estimated Monthly Cost:** $65 - $190/month for production apps

---

## 🎯 Scaling Strategies

### Horizontal Scaling
```bash
# Load balancer setup (Nginx)
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

### Database Scaling
```sql
-- Read replicas for query optimization
-- Master-slave replication
-- Connection pooling
-- Query optimization with EXPLAIN
```

### Caching Strategy
```
Browser Cache → CDN → Application Cache → Database
```

---

## 📞 Support & Troubleshooting

### Getting Help

1. **Check Logs:**
   ```bash
   # Railway logs
   railway logs
   
   # Heroku logs
   heroku logs --tail
   
   # PM2 logs
   pm2 logs
   ```

2. **Database Issues:**
   ```bash
   # Check connections
   mysql -h host -u user -p
   
   # Verify tables
   SHOW TABLES;
   
   # Check indexes
   SHOW INDEX FROM questions;
   ```

3. **API Testing:**
   ```bash
   # Use Postman or curl
   curl -X POST https://your-api.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

---

## 🌟 Production Best Practices Summary

1. **Security First:** Always use HTTPS, secure environment variables
2. **Monitor Everything:** Set up logging, error tracking, and performance monitoring
3. **Backup Regularly:** Automated daily database backups
4. **Test Before Deploy:** Run tests in staging environment
5. **Gradual Rollout:** Use feature flags for new features
6. **Document Changes:** Keep a changelog
7. **Have Rollback Plan:** Be ready to revert if needed
8. **Optimize Performance:** Regular performance audits
9. **Keep Dependencies Updated:** Regular security updates
10. **Plan for Scale:** Design with growth in mind

---

## 📚 Additional Resources

- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Deployment Documentation](https://create-react-app.dev/docs/deployment/)
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Web Security Checklist](https://owasp.org/www-project-web-security-testing-guide/)

---

## ✅ Final Deployment Command Summary

```bash
# 1. Build frontend
cd frontend && npm run build

# 2. Test backend
cd ../backend && npm test

# 3. Deploy backend (Railway)
railway up

# 4. Deploy frontend (Vercel)
cd ../frontend && vercel --prod

# 5. Verify deployment
curl https://your-api.com/health
curl https://your-app.vercel.app

# 6. Monitor logs
railway logs --follow
```

---

**Congratulations! 🎉 Your Quiz Platform is now live in production!**

Remember to monitor your application regularly and keep it updated with security patches and new features.