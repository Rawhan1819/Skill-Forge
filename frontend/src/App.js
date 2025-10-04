
// #3 after landing page main part 
// import React, { useState, useEffect } from 'react';
// import { BookOpen, Trophy, User, LogOut, Award, TrendingUp, Target, Zap, Brain, Moon, Sun, Flame, Star, Clock, Medal, BarChart3, Gift } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = {
//   register: async (username, email, password) => {
//     const res = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, password })
//     });
//     return res.json();
//   },
//   login: async (email, password) => {
//     const res = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     return res.json();
//   },
//   getCategories: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/categories`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   getQuiz: async (token, categoryId, difficulty) => {
//     const res = await fetch(`${API_BASE_URL}/quiz/${categoryId}/${difficulty}?limit=10`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   submitQuiz: async (token, data) => {
//     const res = await fetch(`${API_BASE_URL}/quiz/submit-enhanced`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` 
//       },
//       body: JSON.stringify(data)
//     });
//     return res.json();
//   },
//   getLeaderboard: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/leaderboard/xp`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   getUserScores: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/user/scores`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   getAnalytics: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/user/analytics`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   getAchievements: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/user/achievements`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   getDailyChallenge: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/daily-challenge`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },
//   toggleDarkMode: async (token) => {
//     const res = await fetch(`${API_BASE_URL}/user/toggle-dark-mode`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   }
// };

// export default function QuizApp() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [currentView, setCurrentView] = useState('landing');
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (token) {
//       const userData = JSON.parse(localStorage.getItem('user') || '{}');
//       setUser(userData);
//       setCurrentView('dashboard');
//     }
//   }, [token]);

//   const handleLogin = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem('token', userToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setCurrentView('dashboard');
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setCurrentView('landing');
//   };

//   const toggleDarkMode = async () => {
//     try {
//       const result = await api.toggleDarkMode(token);
//       setDarkMode(result.darkMode);
//     } catch (error) {
//       console.error('Error toggling dark mode:', error);
//     }
//   };

//   if (!token) {
//     if (currentView === 'landing') {
//       return <LandingPage onGetStarted={() => setCurrentView('auth')} />;
//     }
//     return <AuthPage onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
//   }

//   const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100';
//   const navBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   return (
//     <div className={`min-h-screen ${bgClass}`}>
//       <nav className={`${navBgClass} shadow-md`}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <BookOpen className="text-indigo-600" size={32} />
//             <h1 className={`text-2xl font-bold ${textClass}`}>Skill Forge</h1>
//           </div>
//           <div className="flex items-center space-x-6">
//             <button
//               onClick={() => setCurrentView('dashboard')}
//               className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
//             >
//               <BarChart3 size={20} />
//               <span>Dashboard</span>
//             </button>
//             <button
//               onClick={() => setCurrentView('categories')}
//               className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
//             >
//               <Target size={20} />
//               <span>Quizzes</span>
//             </button>
//             <button
//               onClick={() => setCurrentView('leaderboard')}
//               className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
//             >
//               <Trophy size={20} />
//               <span>Leaderboard</span>
//             </button>
//             <button
//               onClick={() => setCurrentView('achievements')}
//               className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
//             >
//               <Award size={20} />
//               <span>Achievements</span>
//             </button>
//             <button
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//             >
//               {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 <div className="flex items-center space-x-1">
//                   <Star className="text-yellow-500" size={16} />
//                   <span className="font-bold">{user?.level || 1}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setCurrentView('profile')}
//                 className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
//               >
//                 <User size={20} />
//                 <span>{user?.username}</span>
//               </button>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-1 text-red-600 hover:text-red-700"
//             >
//               <LogOut size={20} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {currentView === 'dashboard' && <DashboardView token={token} darkMode={darkMode} setCurrentView={setCurrentView} />}
//         {currentView === 'categories' && <CategoriesView token={token} darkMode={darkMode} />}
//         {currentView === 'leaderboard' && <LeaderboardView token={token} darkMode={darkMode} />}
//         {currentView === 'achievements' && <AchievementsView token={token} darkMode={darkMode} />}
//         {currentView === 'profile' && <ProfileView token={token} user={user} darkMode={darkMode} />}
//       </div>
//     </div>
//   );
// }

// function LandingPage({ onGetStarted }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-16">
//           <BookOpen className="text-white mx-auto mb-6" size={64} />
//           <h1 className="text-6xl font-bold text-white mb-4">Skill Forge</h1>
//           <p className="text-2xl text-indigo-200 mb-8">Master Your Skills Through Interactive Learning</p>
//           <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
//             Test your knowledge, earn XP, unlock achievements, and compete with learners worldwide!
//           </p>
//           <button
//             onClick={onGetStarted}
//             className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-bold text-xl hover:bg-indigo-100 transition transform hover:scale-105 shadow-2xl"
//           >
//             Get Started - Sign Up / Login
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
//           <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-20 transition">
//             <Brain className="text-yellow-300 mx-auto mb-4" size={48} />
//             <h3 className="text-xl font-bold text-white mb-2">Multiple Categories</h3>
//             <p className="text-gray-300">Maths, Science, Coding, and more</p>
//           </div>
//           <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-20 transition">
//             <Zap className="text-green-300 mx-auto mb-4" size={48} />
//             <h3 className="text-xl font-bold text-white mb-2">XP & Levels</h3>
//             <p className="text-gray-300">Earn experience and level up</p>
//           </div>
//           <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-20 transition">
//             <Trophy className="text-orange-300 mx-auto mb-4" size={48} />
//             <h3 className="text-xl font-bold text-white mb-2">Achievements</h3>
//             <p className="text-gray-300">Unlock badges and rewards</p>
//           </div>
//           <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-20 transition">
//             <Flame className="text-red-300 mx-auto mb-4" size={48} />
//             <h3 className="text-xl font-bold text-white mb-2">Daily Streaks</h3>
//             <p className="text-gray-300">Build your learning habit</p>
//           </div>
//         </div>

//         <div className="text-center mt-20">
//           <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
//           <button
//             onClick={onGetStarted}
//             className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:from-pink-600 hover:to-purple-700 transition transform hover:scale-105 shadow-2xl"
//           >
//             Sign Up / Login Now →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AuthPage({ onLogin, onBack }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       let result;
//       if (isLogin) {
//         result = await api.login(formData.email, formData.password);
//       } else {
//         result = await api.register(formData.username, formData.email, formData.password);
//       }

//       if (result.error) {
//         setError(result.error);
//       } else {
//         onLogin(result.user, result.token);
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <button onClick={onBack} className="text-indigo-600 hover:text-indigo-700 mb-4">
//           ← Back to Home
//         </button>
//         <div className="text-center mb-8">
//           <BookOpen className="mx-auto text-indigo-600 mb-4" size={48} />
//           <h2 className="text-3xl font-bold text-gray-800">Skill Forge</h2>
//           <p className="text-gray-600 mt-2">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Username"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required={!isLogin}
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">{error}</div>}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
//           </button>
//         </form>
//         <p className="text-center mt-6 text-gray-600">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-semibold hover:underline">
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// function DashboardView({ token, darkMode, setCurrentView }) {
//   const [analytics, setAnalytics] = useState(null);
//   const [dailyChallenge, setDailyChallenge] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const analyticsData = await api.getAnalytics(token);
//       const challengeData = await api.getDailyChallenge(token);
//       setAnalytics(analyticsData);
//       setDailyChallenge(challengeData);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className={darkMode ? 'text-white' : 'text-gray-600'}>Loading...</div>;

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   return (
//     <div className="space-y-6">
//       <h2 className={`text-4xl font-bold ${textClass}`}>Dashboard</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Level</p>
//               <p className={`text-3xl font-bold ${textClass}`}>{analytics?.level || 1}</p>
//             </div>
//             <Star className="text-yellow-500" size={48} />
//           </div>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP Points</p>
//               <p className={`text-3xl font-bold ${textClass}`}>{analytics?.xp_points || 0}</p>
//             </div>
//             <Zap className="text-blue-500" size={48} />
//           </div>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Streak</p>
//               <p className={`text-3xl font-bold ${textClass}`}>{analytics?.current_streak || 0} 🔥</p>
//             </div>
//             <Flame className="text-orange-500" size={48} />
//           </div>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Achievements</p>
//               <p className={`text-3xl font-bold ${textClass}`}>{analytics?.achievements_unlocked || 0}</p>
//             </div>
//             <Award className="text-purple-500" size={48} />
//           </div>
//         </div>
//       </div>

//       {dailyChallenge && (
//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <h3 className={`text-2xl font-bold ${textClass} mb-4 flex items-center space-x-2`}>
//             <Gift className="text-yellow-500" />
//             <span>Daily Challenge</span>
//           </h3>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-xl font-semibold ${textClass}`}>
//                 {dailyChallenge.category_icon} {dailyChallenge.category_name}
//               </p>
//               <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                 Difficulty: {dailyChallenge.difficulty}
//               </p>
//             </div>
//             {!dailyChallenge.completed && (
//               <button
//                 onClick={() => setCurrentView('categories')}
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
//               >
//                 Start Challenge
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function CategoriesView({ token, darkMode }) {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [difficulty, setDifficulty] = useState(null);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const data = await api.getCategories(token);
//     setCategories(data);
//   };

//   if (quizStarted) {
//     return <QuizView token={token} category={selectedCategory} difficulty={difficulty} darkMode={darkMode} onComplete={() => {
//       setQuizStarted(false);
//       setSelectedCategory(null);
//       setDifficulty(null);
//     }} />;
//   }

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   if (selectedCategory && !difficulty) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <button onClick={() => setSelectedCategory(null)} className={`mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
//           ← Back
//         </button>
//         <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
//           <div className="text-center mb-8">
//             <span className="text-6xl mb-4 block">{selectedCategory.icon}</span>
//             <h2 className={`text-3xl font-bold ${textClass}`}>{selectedCategory.name}</h2>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             {['easy', 'medium', 'hard'].map((level) => (
//               <button
//                 key={level}
//                 onClick={() => { setDifficulty(level); setQuizStarted(true); }}
//                 className={`p-6 rounded-lg border-2 ${
//                   level === 'easy' ? 'border-green-500' : level === 'medium' ? 'border-yellow-500' : 'border-red-500'
//                 }`}
//               >
//                 <div className={`text-2xl font-bold capitalize ${textClass}`}>{level}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className={`text-4xl font-bold ${textClass} mb-8 text-center`}>Choose Your Challenge</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {categories.map((cat) => (
//           <button key={cat.id} onClick={() => setSelectedCategory(cat)} className={`${cardBg} rounded-xl shadow-lg p-6`}>
//             <div className="text-5xl mb-4">{cat.icon}</div>
//             <h3 className={`text-xl font-bold ${textClass}`}>{cat.name}</h3>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function QuizView({ token, category, difficulty, darkMode, onComplete }) {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState(null);
//   const [startTime] = useState(Date.now());
//   const [timeElapsed, setTimeElapsed] = useState(0);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     if (!loading && !showResults) {
//       const timer = setInterval(() => {
//         setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [loading, showResults]);

//   const fetchQuestions = async () => {
//     const data = await api.getQuiz(token, category.id, difficulty);
//     if (data.error) {
//       alert(data.error);
//       onComplete();
//     } else {
//       setQuestions(data);
//       setLoading(false);
//     }
//   };

//   const handleNext = () => {
//     if (!selected) return alert('Please select an answer');
    
//     const newAnswers = [...answers, { questionId: questions[current].id, selectedAnswer: selected }];
//     setAnswers(newAnswers);
//     setSelected(null);

//     if (current < questions.length - 1) {
//       setCurrent(current + 1);
//     } else {
//       submitQuiz(newAnswers);
//     }
//   };

//   const submitQuiz = async (finalAnswers) => {
//     const timeTaken = Math.floor((Date.now() - startTime) / 1000);
//     const result = await api.submitQuiz(token, {
//       categoryId: category.id,
//       difficulty,
//       answers: finalAnswers,
//       timeTaken
//     });
//     setResults(result);
//     setShowResults(true);
//   };

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   if (loading) return <div className={textClass}>Loading...</div>;

//   if (showResults) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
//           <div className="text-center mb-8">
//             <Award className="mx-auto text-yellow-500 mb-4" size={64} />
//             <h2 className={`text-3xl font-bold ${textClass}`}>Quiz Complete!</h2>
//             <div className="text-5xl font-bold text-indigo-600 my-6">{results.score}%</div>
//             <p className={textClass}>{results.correctAnswers} / {results.totalQuestions} correct</p>

//             <div className="grid grid-cols-3 gap-4 mt-8">
//               <div className="p-4 rounded-lg bg-blue-50">
//                 <Zap className="text-blue-500 mx-auto mb-2" size={32} />
//                 <p className="text-2xl font-bold">+{results.xpEarned}</p>
//                 <p className="text-sm">XP</p>
//               </div>
//               <div className="p-4 rounded-lg bg-yellow-50">
//                 <Medal className="text-yellow-500 mx-auto mb-2" size={32} />
//                 <p className="text-2xl font-bold">+{results.coinsEarned}</p>
//                 <p className="text-sm">Coins</p>
//               </div>
//               <div className="p-4 rounded-lg bg-orange-50">
//                 <Flame className="text-orange-500 mx-auto mb-2" size={32} />
//                 <p className="text-2xl font-bold">{results.newStreak}</p>
//                 <p className="text-sm">Streak</p>
//               </div>
//             </div>

//             {results.unlockedAchievements && results.unlockedAchievements.length > 0 && (
//               <div className="mt-6 p-4 rounded-lg bg-purple-50 border-2 border-purple-500">
//                 <h3 className="text-xl font-bold mb-3">🎉 New Achievements!</h3>
//                 {results.unlockedAchievements.map((ach) => (
//                   <div key={ach.id} className="mb-2">
//                     {ach.icon} {ach.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="space-y-4 mb-8">
//             <h3 className={`text-xl font-semibold ${textClass}`}>Review:</h3>
//             {results.results.map((r, idx) => (
//               <div key={idx} className={`p-4 rounded-lg ${r.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-2`}>
//                 <div className="flex justify-between mb-2">
//                   <span>Question {idx + 1}</span>
//                   <span className={r.isCorrect ? 'text-green-600' : 'text-red-600'}>
//                     {r.isCorrect ? '✓ Correct' : '✗ Incorrect'}
//                   </span>
//                 </div>
//                 <div className="text-sm">
//                   <div className={r.isCorrect ? 'text-green-600' : 'text-red-600'}>
//                     Your answer: {r.selectedAnswer}
//                   </div>
//                   <div className="text-green-600 font-semibold">
//                     Correct answer: {r.correctAnswer}
//                   </div>
//                   {r.explanation && (
//                     <div className="text-gray-600 mt-2 italic">💡 {r.explanation}</div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button onClick={onComplete} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
//             Back to Categories
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const question = questions[current];
//   const progress = ((current + 1) / questions.length) * 100;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//             Question {current + 1} / {questions.length}
//           </span>
//           <div className="flex items-center space-x-2">
//             <Clock size={16} />
//             <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
//           </div>
//         </div>
//         <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
//           <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
//         </div>
//       </div>

//       <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
//         <h3 className={`text-2xl font-bold ${textClass} mb-6`}>{question.question}</h3>

//         <div className="space-y-3">
//           {['A', 'B', 'C', 'D'].map((letter) => (
//             <button
//               key={letter}
//               onClick={() => setSelected(letter)}
//               className={`w-full text-left p-4 rounded-lg border-2 ${
//                 selected === letter
//                   ? 'border-indigo-600 bg-indigo-50'
//                   : darkMode
//                   ? 'border-gray-600 bg-gray-700'
//                   : 'border-gray-300'
//               }`}
//             >
//               <span className="font-semibold mr-3">{letter}.</span>
//               {question[`option_${letter.toLowerCase()}`]}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleNext}
//           disabled={!selected}
//           className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
//         >
//           {current < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
//         </button>
//       </div>
//     </div>
//   );
// }

// function LeaderboardView({ token, darkMode }) {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLeaderboard();
//   }, []);

//   const fetchLeaderboard = async () => {
//     const data = await api.getLeaderboard(token);
//     setLeaderboard(data);
//     setLoading(false);
//   };

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   if (loading) return <div className={textClass}>Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="text-center mb-8">
//         <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
//         <h2 className={`text-4xl font-bold ${textClass}`}>Global Leaderboard</h2>
//       </div>

//       <div className={`${cardBg} rounded-xl shadow-lg overflow-hidden`}>
//         <table className="w-full">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="px-6 py-4 text-left">Rank</th>
//               <th className="px-6 py-4 text-left">Player</th>
//               <th className="px-6 py-4 text-center">Level</th>
//               <th className="px-6 py-4 text-center">XP</th>
//               <th className="px-6 py-4 text-center">Streak</th>
//               <th className="px-6 py-4 text-center">Achievements</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.map((user, idx) => (
//               <tr key={user.id} className={idx < 3 ? 'bg-yellow-50' : darkMode ? 'bg-gray-700' : 'bg-white'}>
//                 <td className="px-6 py-4 font-bold">
//                   {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-2xl">{user.avatar || '👤'}</span>
//                     <span className={`font-semibold ${textClass}`}>{user.username}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <Star className="inline text-yellow-500" size={16} /> {user.level}
//                 </td>
//                 <td className="px-6 py-4 text-center text-indigo-600 font-bold">{user.xp_points}</td>
//                 <td className="px-6 py-4 text-center">
//                   {user.current_streak > 0 ? `${user.current_streak} 🔥` : '-'}
//                 </td>
//                 <td className="px-6 py-4 text-center">{user.achievements_count || 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function AchievementsView({ token, darkMode }) {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAchievements();
//   }, []);

//   const fetchAchievements = async () => {
//     const data = await api.getAchievements(token);
//     setAchievements(data);
//     setLoading(false);
//   };

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   if (loading) return <div className={textClass}>Loading...</div>;

//   const unlockedCount = achievements.filter(a => a.unlocked).length;

//   return (
//     <div>
//       <div className="text-center mb-8">
//         <Award className="mx-auto text-purple-500 mb-4" size={48} />
//         <h2 className={`text-4xl font-bold ${textClass}`}>Achievements</h2>
//         <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//           {unlockedCount} / {achievements.length} Unlocked
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {achievements.map((ach) => (
//           <div key={ach.id} className={`${cardBg} rounded-xl shadow-lg p-6 ${!ach.unlocked && 'opacity-50'}`}>
//             <div className="text-center">
//               <div className="text-5xl mb-2">{ach.icon}</div>
//               <h3 className={`text-xl font-bold ${textClass}`}>{ach.name}</h3>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
//                 {ach.description}
//               </p>
//               <div className="mt-4 text-sm">
//                 Rewards: {ach.xp_reward} XP, {ach.coin_reward} Coins
//               </div>
//               {ach.unlocked ? (
//                 <span className="mt-3 inline-block text-green-600 text-sm">
//                   ✓ Unlocked: {new Date(ach.unlocked_at).toLocaleDateString()}
//                 </span>
//               ) : (
//                 <span className="mt-3 inline-block bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
//                   🔒 Locked
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ProfileView({ token, user, darkMode }) {
//   const [scores, setScores] = useState([]);
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const scoresData = await api.getUserScores(token);
//       const analyticsData = await api.getAnalytics(token);
//       setScores(scoresData);
//       setAnalytics(analyticsData);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textClass = darkMode ? 'text-white' : 'text-gray-800';

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className={`${cardBg} rounded-xl shadow-lg p-6 text-center`}>
//           <div className="text-6xl mb-2">{user.avatar || '👤'}</div>
//           <h3 className={`text-2xl font-bold ${textClass}`}>{user.username}</h3>
//           <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <Star className="text-yellow-500" size={32} />
//             <div className="text-right">
//               <div className={`text-3xl font-bold ${textClass}`}>{analytics?.level || 1}</div>
//               <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Level</div>
//             </div>
//           </div>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <Flame className="text-orange-500" size={32} />
//             <div className="text-right">
//               <div className={`text-3xl font-bold ${textClass}`}>{analytics?.current_streak || 0}</div>
//               <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Streak</div>
//             </div>
//           </div>
//         </div>

//         <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//           <div className="flex items-center justify-between">
//             <Trophy className="text-purple-500" size={32} />
//             <div className="text-right">
//               <div className={`text-3xl font-bold ${textClass}`}>{analytics?.achievements_unlocked || 0}</div>
//               <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Achievements</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
//         <h3 className={`text-2xl font-bold ${textClass} mb-6`}>Recent Quiz History</h3>
//         {loading ? (
//           <div className={textClass}>Loading...</div>
//         ) : scores.length === 0 ? (
//           <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} py-8`}>
//             No quizzes yet. Start your first quiz!
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {scores.slice(0, 10).map((score) => (
//               <div
//                 key={score.id}
//                 className={`flex items-center justify-between p-4 border rounded-lg ${
//                   darkMode ? 'border-gray-700' : 'border-gray-200'
//                 }`}
//               >
//                 <div>
//                   <div className={`font-semibold ${textClass}`}>{score.category_name}</div>
//                   <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {score.difficulty} • {score.total_questions} questions
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold text-indigo-600">{score.score}%</div>
//                   <div className="text-xs">+{score.xp_earned} XP</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// #main landing page
import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, User, LogOut, Award, TrendingUp, Target, Zap, Brain, Moon, Sun, Flame, Star, Clock, Medal, BarChart3, Gift } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  register: async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return res.json();
  },
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  getCategories: async (token) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getQuiz: async (token, categoryId, difficulty) => {
    const res = await fetch(`${API_BASE_URL}/quiz/${categoryId}/${difficulty}?limit=10`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  submitQuiz: async (token, data) => {
    const res = await fetch(`${API_BASE_URL}/quiz/submit-enhanced`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLeaderboard: async (token) => {
    const res = await fetch(`${API_BASE_URL}/leaderboard/xp`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getUserScores: async (token) => {
    const res = await fetch(`${API_BASE_URL}/user/scores`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getAnalytics: async (token) => {
    const res = await fetch(`${API_BASE_URL}/user/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getAchievements: async (token) => {
    const res = await fetch(`${API_BASE_URL}/user/achievements`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getDailyChallenge: async (token) => {
    const res = await fetch(`${API_BASE_URL}/daily-challenge`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  toggleDarkMode: async (token) => {
    const res = await fetch(`${API_BASE_URL}/user/toggle-dark-mode`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  }
};

export default function QuizApp() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentView, setCurrentView] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
      setCurrentView('dashboard');
    }
  }, [token]);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentView('landing');
  };

  const toggleDarkMode = async () => {
    try {
      const result = await api.toggleDarkMode(token);
      setDarkMode(result.darkMode);
    } catch (error) {
      console.error('Error toggling dark mode:', error);
    }
  };

  if (!token) {
    if (currentView === 'landing') {
      return <LandingPage onGetStarted={() => setCurrentView('auth')} />;
    }
    return <AuthPage onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100';
  const navBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <nav className={`${navBgClass} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-indigo-600" size={32} />
            <h1 className={`text-2xl font-bold ${textClass}`}>Skill Forge</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentView('categories')}
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              <Target size={20} />
              <span>Quizzes</span>
            </button>
            <button
              onClick={() => setCurrentView('leaderboard')}
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              <Trophy size={20} />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setCurrentView('achievements')}
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              <Award size={20} />
              <span>Achievements</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <div className="flex items-center space-x-2">
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500" size={16} />
                  <span className="font-bold">{user?.level || 1}</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('profile')}
                className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-indigo-600'}`}
              >
                <User size={20} />
                <span>{user?.username}</span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'dashboard' && <DashboardView token={token} darkMode={darkMode} setCurrentView={setCurrentView} />}
        {currentView === 'categories' && <CategoriesView token={token} darkMode={darkMode} />}
        {currentView === 'leaderboard' && <LeaderboardView token={token} darkMode={darkMode} />}
        {currentView === 'achievements' && <AchievementsView token={token} darkMode={darkMode} />}
        {currentView === 'profile' && <ProfileView token={token} user={user} darkMode={darkMode} />}
      </div>
    </div>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-indigo-600" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Skill Forge
            </span>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <BookOpen className="text-white" size={40} />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Master Skills,
            </span>
            <br />
            <span className="text-gray-800">Forge Your Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            An intelligent learning platform where knowledge meets gamification. 
            Test yourself, earn rewards, and compete with learners worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Learning Free</span>
              <span>→</span>
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            ✨ No credit card required • ⚡ Instant access • 🎯 100% Free forever
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
            <div className="text-gray-600 font-medium">Active Learners</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-600 font-medium">Categories</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Questions</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
            <div className="text-gray-600 font-medium">Achievements</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Why Choose Skill Forge?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need to accelerate your learning journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Brain className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Adaptive quizzes across Math, Science, Programming, and more. Learn at your own pace.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">XP & Levels</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn experience points, level up, and unlock exclusive badges as you progress.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Trophy className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Leaderboards</h3>
              <p className="text-gray-600 leading-relaxed">
                Compete globally, track your ranking, and climb to the top of the leaderboard.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Flame className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Daily Streaks</h3>
              <p className="text-gray-600 leading-relaxed">
                Build consistency with daily challenges and maintain your learning streak.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Simple, intuitive, and designed for success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sign Up Free</h3>
              <p className="text-gray-600">
                Create your account in seconds. No payment required, ever.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose & Learn</h3>
              <p className="text-gray-600">
                Pick your favorite category and difficulty level to start learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your growth with detailed analytics and achievements.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Explore Categories
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Master diverse subjects with our comprehensive question bank
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔢', name: 'Mathematics', color: 'from-blue-400 to-blue-600' },
              { icon: '🔬', name: 'Science', color: 'from-green-400 to-green-600' },
              { icon: '🌍', name: 'Social Studies', color: 'from-yellow-400 to-yellow-600' },
              { icon: '💡', name: 'General Knowledge', color: 'from-purple-400 to-purple-600' },
              { icon: '🐍', name: 'Python', color: 'from-indigo-400 to-indigo-600' },
              { icon: '📜', name: 'JavaScript', color: 'from-yellow-500 to-yellow-600' },
              { icon: '☕', name: 'Java', color: 'from-red-400 to-red-600' },
              { icon: '⚡', name: 'C++', color: 'from-cyan-400 to-cyan-600' }
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <div className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Loved by Learners
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            See what our community has to say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Computer Science Student',
                avatar: '👩‍💻',
                text: 'Skill Forge helped me ace my programming exams. The gamification keeps me motivated!'
              },
              {
                name: 'Michael Chen',
                role: 'High School Teacher',
                avatar: '👨‍🏫',
                text: 'I recommend this to all my students. The analytics feature is incredibly useful for tracking progress.'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Lifelong Learner',
                avatar: '👩‍🎓',
                text: 'The daily challenges keep me coming back. I have maintained a 60-day streak!'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already mastering new skills every day.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-xl hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Start Learning Now</span>
            <span>→</span>
          </button>
          <p className="text-indigo-200 mt-6 text-sm">
            No credit card • No commitment • Start in 30 seconds
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="text-indigo-600" size={28} />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Skill Forge
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering learners worldwide with interactive, gamified education.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600">Categories</a></li>
                <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Skill Forge. Built with ❤️ for learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuthPage({ onLogin, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await api.login(formData.email, formData.password);
      } else {
        result = await api.register(formData.username, formData.email, formData.password);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onLogin(result.user, result.token);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button onClick={onBack} className="text-indigo-600 hover:text-indigo-700 mb-4">
          ← Back to Home
        </button>
        <div className="text-center mb-8">
          <BookOpen className="mx-auto text-indigo-600 mb-4" size={48} />
          <h2 className="text-3xl font-bold text-gray-800">Skill Forge</h2>
          <p className="text-gray-600 mt-2">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required={!isLogin}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-semibold hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

function DashboardView({ token, darkMode, setCurrentView }) {
  const [analytics, setAnalytics] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const analyticsData = await api.getAnalytics(token);
      const challengeData = await api.getDailyChallenge(token);
      setAnalytics(analyticsData);
      setDailyChallenge(challengeData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={darkMode ? 'text-white' : 'text-gray-600'}>Loading...</div>;

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className="space-y-6">
      <h2 className={`text-4xl font-bold ${textClass}`}>Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Level</p>
              <p className={`text-3xl font-bold ${textClass}`}>{analytics?.level || 1}</p>
            </div>
            <Star className="text-yellow-500" size={48} />
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP Points</p>
              <p className={`text-3xl font-bold ${textClass}`}>{analytics?.xp_points || 0}</p>
            </div>
            <Zap className="text-blue-500" size={48} />
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Streak</p>
              <p className={`text-3xl font-bold ${textClass}`}>{analytics?.current_streak || 0} 🔥</p>
            </div>
            <Flame className="text-orange-500" size={48} />
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Achievements</p>
              <p className={`text-3xl font-bold ${textClass}`}>{analytics?.achievements_unlocked || 0}</p>
            </div>
            <Award className="text-purple-500" size={48} />
          </div>
        </div>
      </div>

      {dailyChallenge && (
        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <h3 className={`text-2xl font-bold ${textClass} mb-4 flex items-center space-x-2`}>
            <Gift className="text-yellow-500" />
            <span>Daily Challenge</span>
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xl font-semibold ${textClass}`}>
                {dailyChallenge.category_icon} {dailyChallenge.category_name}
              </p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Difficulty: {dailyChallenge.difficulty}
              </p>
            </div>
            {!dailyChallenge.completed && (
              <button
                onClick={() => setCurrentView('categories')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Start Challenge
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesView({ token, darkMode }) {
  const [activeTab, setActiveTab] = useState('normal'); // normal, ai, group
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories(activeTab);
  }, [activeTab]);

  const fetchCategories = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/categories?type=${type}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (quizStarted) {
    return (
      <QuizView
        token={token}
        category={selectedCategory}
        difficulty={difficulty}
        darkMode={darkMode}
        onComplete={() => {
          setQuizStarted(false);
          setSelectedCategory(null);
          setDifficulty(null);
        }}
      />
    );
  }

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const mutedText = darkMode ? 'text-gray-400' : 'text-gray-600';

  if (selectedCategory && !difficulty) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline flex items-center space-x-2`}
        >
          <span>←</span>
          <span>Back to Categories</span>
        </button>
        <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">{selectedCategory.icon}</span>
            <h2 className={`text-3xl font-bold ${textClass}`}>{selectedCategory.name}</h2>
            <p className={`${mutedText} mt-2`}>{selectedCategory.description}</p>
          </div>
          <h3 className={`text-xl font-semibold ${textClass} mb-4`}>Select Difficulty:</h3>
          <div className="grid grid-cols-3 gap-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => { setDifficulty(level); setQuizStarted(true); }}
                className={`p-6 rounded-lg border-2 transition transform hover:scale-105 ${
                  level === 'easy'
                    ? darkMode 
                      ? 'border-green-500 bg-green-900 hover:bg-green-800' 
                      : 'border-green-500 hover:bg-green-50'
                    : level === 'medium'
                    ? darkMode
                      ? 'border-yellow-500 bg-yellow-900 hover:bg-yellow-800'
                      : 'border-yellow-500 hover:bg-yellow-50'
                    : darkMode
                    ? 'border-red-500 bg-red-900 hover:bg-red-800'
                    : 'border-red-500 hover:bg-red-50'
                } ${darkMode ? 'bg-opacity-20' : ''}`}
              >
                <div className={`text-2xl font-bold capitalize mb-2 ${textClass}`}>{level}</div>
                <div className={`text-sm ${mutedText}`}>10 Questions</div>
                <div className={`text-xs ${mutedText} mt-2`}>
                  {level === 'easy' ? '1x XP' : level === 'medium' ? '1.5x XP' : '2x XP'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-1 shadow-lg`}>
          <button
            onClick={() => setActiveTab('normal')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'normal'
                ? 'bg-indigo-600 text-white shadow-md'
                : darkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📚 Normal Quiz
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-md'
                : darkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🤖 AI Quiz
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'group'
                ? 'bg-indigo-600 text-white shadow-md'
                : darkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            👥 Group Quiz
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${textClass} mb-4`}>
          {activeTab === 'normal' && 'Choose Your Challenge'}
          {activeTab === 'ai' && 'AI-Powered Quizzes'}
          {activeTab === 'group' && 'Group Study Quizzes'}
        </h2>
        <p className={`${mutedText} text-lg`}>
          {activeTab === 'normal' && 'Select a category to begin your learning journey'}
          {activeTab === 'ai' && 'Personalized quizzes generated by AI based on your performance'}
          {activeTab === 'group' && 'Advanced computer science topics for group study sessions'}
        </p>
      </div>

      {/* Content */}
      {activeTab === 'ai' ? (
        // AI Quiz - Coming Soon
        <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto`}>
          <div className="text-8xl mb-6">🤖</div>
          <h3 className={`text-3xl font-bold ${textClass} mb-4`}>AI Quiz Coming Soon!</h3>
          <p className={`${mutedText} text-lg mb-6`}>
            Get ready for personalized quizzes powered by artificial intelligence. 
            The AI will adapt to your skill level and create custom questions just for you!
          </p>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-6`}>
            <h4 className={`text-xl font-semibold ${textClass} mb-3`}>Features Coming:</h4>
            <ul className={`${mutedText} text-left space-y-2`}>
              <li>✨ Adaptive difficulty based on your performance</li>
              <li>🎯 Personalized question generation</li>
              <li>📊 AI-powered learning recommendations</li>
              <li>🔮 Predictive analytics for skill gaps</li>
              <li>🎓 Custom study plans</li>
            </ul>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center">
          <div className={`text-xl ${mutedText}`}>Loading categories...</div>
        </div>
      ) : categories.length === 0 ? (
        <div className={`${cardBg} rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto`}>
          <h3 className={`text-2xl font-bold ${textClass} mb-4`}>No categories available</h3>
          <p className={mutedText}>Check back soon for new quiz categories!</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${
          activeTab === 'group' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
        } gap-6`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`${cardBg} rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 ${
                activeTab === 'group' ? 'hover:border-2 hover:border-indigo-500' : ''
              }`}
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className={`text-xl font-bold ${textClass} mb-2`}>{cat.name}</h3>
              <p className={`${mutedText} text-sm`}>{cat.description}</p>
              {activeTab === 'group' && (
                <div className="mt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Advanced Topic
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Info Banner for Group Quiz */}
      {activeTab === 'group' && categories.length > 0 && (
        <div className={`mt-8 ${darkMode ? 'bg-indigo-900 bg-opacity-30' : 'bg-indigo-50'} rounded-xl p-6 border-2 ${darkMode ? 'border-indigo-700' : 'border-indigo-200'}`}>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className={`text-lg font-semibold ${textClass} mb-2`}>Group Quiz Mode</h4>
              <p className={mutedText}>
                These advanced computer science topics are perfect for group study sessions. 
                Challenge your friends, compare scores, and learn together! 
                {activeTab === 'group' && categories.length === 0 && (
                  <span className="block mt-2 text-yellow-600 font-semibold">
                    ⚠️ Questions for these topics will be added soon!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizView({ token, category, difficulty, darkMode, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!loading && !showResults) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, showResults]);

  const fetchQuestions = async () => {
    const data = await api.getQuiz(token, category.id, difficulty);
    if (data.error) {
      alert(data.error);
      onComplete();
    } else {
      setQuestions(data);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selected) return alert('Please select an answer');
    
    const newAnswers = [...answers, { questionId: questions[current].id, selectedAnswer: selected }];
    setAnswers(newAnswers);
    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const result = await api.submitQuiz(token, {
      categoryId: category.id,
      difficulty,
      answers: finalAnswers,
      timeTaken
    });
    setResults(result);
    setShowResults(true);
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  if (loading) return <div className={textClass}>Loading...</div>;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
          <div className="text-center mb-8">
            <Award className="mx-auto text-yellow-500 mb-4" size={64} />
            <h2 className={`text-3xl font-bold ${textClass}`}>Quiz Complete!</h2>
            <div className="text-5xl font-bold text-indigo-600 my-6">{results.score}%</div>
            <p className={textClass}>{results.correctAnswers} / {results.totalQuestions} correct</p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-blue-50">
                <Zap className="text-blue-500 mx-auto mb-2" size={32} />
                <p className="text-2xl font-bold">+{results.xpEarned}</p>
                <p className="text-sm">XP</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50">
                <Medal className="text-yellow-500 mx-auto mb-2" size={32} />
                <p className="text-2xl font-bold">+{results.coinsEarned}</p>
                <p className="text-sm">Coins</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50">
                <Flame className="text-orange-500 mx-auto mb-2" size={32} />
                <p className="text-2xl font-bold">{results.newStreak}</p>
                <p className="text-sm">Streak</p>
              </div>
            </div>

            {results.unlockedAchievements && results.unlockedAchievements.length > 0 && (
              <div className="mt-6 p-4 rounded-lg bg-purple-50 border-2 border-purple-500">
                <h3 className="text-xl font-bold mb-3">🎉 New Achievements!</h3>
                {results.unlockedAchievements.map((ach) => (
                  <div key={ach.id} className="mb-2">
                    {ach.icon} {ach.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <h3 className={`text-xl font-semibold ${textClass}`}>Review:</h3>
            {results.results.map((r, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${r.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-2`}>
                <div className="flex justify-between mb-2">
                  <span>Question {idx + 1}</span>
                  <span className={r.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {r.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className={r.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    Your answer: {r.selectedAnswer}
                  </div>
                  <div className="text-green-600 font-semibold">
                    Correct answer: {r.correctAnswer}
                  </div>
                  {r.explanation && (
                    <div className="text-gray-600 mt-2 italic">💡 {r.explanation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button onClick={onComplete} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Question {current + 1} / {questions.length}
          </span>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
        <h3 className={`text-2xl font-bold ${textClass} mb-6`}>{question.question}</h3>

        <div className="space-y-3">
          {['A', 'B', 'C', 'D'].map((letter) => (
            <button
              key={letter}
              onClick={() => setSelected(letter)}
              className={`w-full text-left p-4 rounded-lg border-2 ${
                selected === letter
                  ? 'border-indigo-600 bg-indigo-50'
                  : darkMode
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-300'
              }`}
            >
              <span className="font-semibold mr-3">{letter}.</span>
              {question[`option_${letter.toLowerCase()}`]}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {current < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
}

function LeaderboardView({ token, darkMode }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const data = await api.getLeaderboard(token);
    setLeaderboard(data);
    setLoading(false);
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  if (loading) return <div className={textClass}>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
        <h2 className={`text-4xl font-bold ${textClass}`}>Global Leaderboard</h2>
      </div>

      <div className={`${cardBg} rounded-xl shadow-lg overflow-hidden`}>
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Player</th>
              <th className="px-6 py-4 text-center">Level</th>
              <th className="px-6 py-4 text-center">XP</th>
              <th className="px-6 py-4 text-center">Streak</th>
              <th className="px-6 py-4 text-center">Achievements</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, idx) => (
              <tr key={user.id} className={idx < 3 ? 'bg-yellow-50' : darkMode ? 'bg-gray-700' : 'bg-white'}>
                <td className="px-6 py-4 font-bold">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{user.avatar || '👤'}</span>
                    <span className={`font-semibold ${textClass}`}>{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Star className="inline text-yellow-500" size={16} /> {user.level}
                </td>
                <td className="px-6 py-4 text-center text-indigo-600 font-bold">{user.xp_points}</td>
                <td className="px-6 py-4 text-center">
                  {user.current_streak > 0 ? `${user.current_streak} 🔥` : '-'}
                </td>
                <td className="px-6 py-4 text-center">{user.achievements_count || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AchievementsView({ token, darkMode }) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const data = await api.getAchievements(token);
    setAchievements(data);
    setLoading(false);
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  if (loading) return <div className={textClass}>Loading...</div>;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div>
      <div className="text-center mb-8">
        <Award className="mx-auto text-purple-500 mb-4" size={48} />
        <h2 className={`text-4xl font-bold ${textClass}`}>Achievements</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          {unlockedCount} / {achievements.length} Unlocked
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className={`${cardBg} rounded-xl shadow-lg p-6 ${!ach.unlocked && 'opacity-50'}`}>
            <div className="text-center">
              <div className="text-5xl mb-2">{ach.icon}</div>
              <h3 className={`text-xl font-bold ${textClass}`}>{ach.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                {ach.description}
              </p>
              <div className="mt-4 text-sm">
                Rewards: {ach.xp_reward} XP, {ach.coin_reward} Coins
              </div>
              {ach.unlocked ? (
                <span className="mt-3 inline-block text-green-600 text-sm">
                  ✓ Unlocked: {new Date(ach.unlocked_at).toLocaleDateString()}
                </span>
              ) : (
                <span className="mt-3 inline-block bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                  🔒 Locked
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ token, user, darkMode }) {
  const [scores, setScores] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const scoresData = await api.getUserScores(token);
      const analyticsData = await api.getAnalytics(token);
      setScores(scoresData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`${cardBg} rounded-xl shadow-lg p-6 text-center`}>
          <div className="text-6xl mb-2">{user.avatar || '👤'}</div>
          <h3 className={`text-2xl font-bold ${textClass}`}>{user.username}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <Star className="text-yellow-500" size={32} />
            <div className="text-right">
              <div className={`text-3xl font-bold ${textClass}`}>{analytics?.level || 1}</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Level</div>
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <Flame className="text-orange-500" size={32} />
            <div className="text-right">
              <div className={`text-3xl font-bold ${textClass}`}>{analytics?.current_streak || 0}</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Streak</div>
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between">
            <Trophy className="text-purple-500" size={32} />
            <div className="text-right">
              <div className={`text-3xl font-bold ${textClass}`}>{analytics?.achievements_unlocked || 0}</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Achievements</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${cardBg} rounded-xl shadow-lg p-6`}>
        <h3 className={`text-2xl font-bold ${textClass} mb-6`}>Recent Quiz History</h3>
        {loading ? (
          <div className={textClass}>Loading...</div>
        ) : scores.length === 0 ? (
          <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} py-8`}>
            No quizzes yet. Start your first quiz!
          </div>
        ) : (
          <div className="space-y-3">
            {scores.slice(0, 10).map((score) => (
              <div
                key={score.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div>
                  <div className={`font-semibold ${textClass}`}>{score.category_name}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {score.difficulty} • {score.total_questions} questions
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{score.score}%</div>
                  <div className="text-xs">+{score.xp_earned} XP</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
