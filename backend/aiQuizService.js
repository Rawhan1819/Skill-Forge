// aiQuizService.js - AI Quiz Generation with Ollama
const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://localhost:11434' });

// AI Quiz Topics with detailed contexts
const AI_TOPICS = {
  'blockchain': {
  name: 'Blockchain & Crypto',
  icon: '⛓️',
  description: 'Bitcoin, Ethereum, smart contracts',
  context: 'blockchain technology, cryptocurrency, NFTs, DeFi'
},
  'programming-basics': {
    name: 'Programming Basics',
    icon: '💻',
    description: 'Variables, loops, functions, data structures',
    context: 'programming fundamentals, syntax, logic, algorithms'
  },
  'web-development': {
    name: 'Web Development',
    icon: '🌐',
    description: 'HTML, CSS, JavaScript, React, APIs',
    context: 'web technologies, frontend, backend, HTTP, REST APIs'
  },
  'data-science': {
    name: 'Data Science',
    icon: '📊',
    description: 'Statistics, pandas, numpy, visualization',
    context: 'data analysis, statistics, machine learning basics, Python libraries'
  },
  'algorithms': {
    name: 'Algorithms & DSA',
    icon: '🔍',
    description: 'Sorting, searching, complexity analysis',
    context: 'algorithms, data structures, time complexity, space complexity, Big O notation'
  },
  'databases': {
    name: 'Database Management',
    icon: '🗄️',
    description: 'SQL, NoSQL, normalization, indexing',
    context: 'databases, SQL queries, normalization, ACID properties, transactions'
  },
  'cybersecurity': {
    name: 'Cybersecurity',
    icon: '🔒',
    description: 'Encryption, authentication, vulnerabilities',
    context: 'security, encryption, authentication, network security, ethical hacking'
  },
  'cloud-computing': {
    name: 'Cloud Computing',
    icon: '☁️',
    description: 'AWS, Azure, Docker, Kubernetes',
    context: 'cloud platforms, virtualization, containers, microservices, DevOps'
  },
  'mobile-development': {
    name: 'Mobile Development',
    icon: '📱',
    description: 'Android, iOS, React Native, Flutter',
    context: 'mobile apps, Android development, iOS development, cross-platform development'
  }
};

// Generate quiz questions using Llama3
async function generateQuestions(topicKey, difficulty = 'medium', numQuestions = 10) {
  const topic = AI_TOPICS[topicKey];
  
  if (!topic) {
    throw new Error('Invalid topic');
  }

  const difficultyPrompts = {
    easy: 'beginner-level, fundamental concepts, basic understanding',
    medium: 'intermediate-level, practical application, moderate complexity',
    hard: 'advanced-level, deep understanding, complex scenarios'
  };

  const prompt = `You are an expert quiz generator. Create EXACTLY ${numQuestions} multiple-choice questions about ${topic.name}.

Topic Context: ${topic.context}
Difficulty Level: ${difficulty} (${difficultyPrompts[difficulty]})

CRITICAL REQUIREMENTS:
1. Generate EXACTLY ${numQuestions} questions
2. Each question MUST have EXACTLY 4 options labeled A, B, C, D
3. Mark the correct answer clearly
4. Provide a brief explanation for each answer
5. Questions should be ${difficultyPrompts[difficulty]}
6. Cover diverse aspects of ${topic.context}
7. Make questions practical and relevant

OUTPUT FORMAT (STRICT JSON):
[
  {
    "question": "Question text here?",
    "options": {
      "A": "Option A text",
      "B": "Option B text",
      "C": "Option C text",
      "D": "Option D text"
    },
    "correctAnswer": "A",
    "explanation": "Brief explanation of why this answer is correct"
  }
]

Generate ONLY valid JSON array. No additional text, no markdown, no code blocks. Start directly with [`;

  try {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        num_predict: 2000
      }
    });

    let content = response.message.content.trim();
    
    // Clean up the response - remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    content = content.trim();
    
    // Find JSON array
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response:', content);
      throw new Error('Failed to parse AI response');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    
    // Validate questions
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format');
    }

    // Ensure we have the right number of questions
    const validQuestions = questions.slice(0, numQuestions).map((q, index) => ({
      id: `ai_${Date.now()}_${index}`,
      question: q.question,
      option_a: q.options.A || q.options.a,
      option_b: q.options.B || q.options.b,
      option_c: q.options.C || q.options.c,
      option_d: q.options.D || q.options.d,
      correct_answer: q.correctAnswer.toUpperCase(),
      explanation: q.explanation,
      topic: topic.name,
      difficulty: difficulty
    }));

    return validQuestions;

  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions. Please try again.');
  }
}

// Generate adaptive questions based on user performance
async function generateAdaptiveQuestions(topicKey, userHistory, numQuestions = 10) {
  const topic = AI_TOPICS[topicKey];
  
  // Analyze user performance to determine difficulty
  let suggestedDifficulty = 'medium';
  
  if (userHistory && userHistory.length > 0) {
    const recentScores = userHistory.slice(-5); // Last 5 quizzes
    const avgScore = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
    
    if (avgScore >= 80) {
      suggestedDifficulty = 'hard';
    } else if (avgScore <= 50) {
      suggestedDifficulty = 'easy';
    } else {
      suggestedDifficulty = 'medium';
    }
  }

  const prompt = `You are an adaptive learning AI. Generate ${numQuestions} multiple-choice questions about ${topic.name} that adapt to the user's skill level.

User Performance: ${userHistory && userHistory.length > 0 ? `Average score: ${userHistory.reduce((sum, s) => sum + s, 0) / userHistory.length}%` : 'New learner'}
Suggested Difficulty: ${suggestedDifficulty}

Topic Context: ${topic.context}

Create questions that:
1. Match the user's current skill level
2. Progressively increase in difficulty if user is performing well
3. Cover gaps in knowledge based on previous performance
4. Are practical and engaging

OUTPUT FORMAT (STRICT JSON):
[
  {
    "question": "Question text?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "correctAnswer": "A",
    "explanation": "Why this answer is correct",
    "difficulty": "easy/medium/hard"
  }
]

Generate ONLY valid JSON. No markdown, no code blocks.`;

  try {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      options: {
        temperature: 0.8,
        top_p: 0.9
      }
    });

    let content = response.message.content.trim();
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse adaptive AI response');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    
    return questions.slice(0, numQuestions).map((q, index) => ({
      id: `ai_adaptive_${Date.now()}_${index}`,
      question: q.question,
      option_a: q.options.A || q.options.a,
      option_b: q.options.B || q.options.b,
      option_c: q.options.C || q.options.c,
      option_d: q.options.D || q.options.d,
      correct_answer: q.correctAnswer.toUpperCase(),
      explanation: q.explanation,
      topic: topic.name,
      difficulty: q.difficulty || suggestedDifficulty,
      isAdaptive: true
    }));

  } catch (error) {
    console.error('Error generating adaptive questions:', error);
    // Fallback to regular generation
    return generateQuestions(topicKey, suggestedDifficulty, numQuestions);
  }
}

// Validate Ollama connection
async function validateOllamaConnection() {
  try {
    await ollama.list();
    return true;
  } catch (error) {
    console.error('Ollama connection failed:', error);
    return false;
  }
}

module.exports = {
  AI_TOPICS,
  generateQuestions,
  generateAdaptiveQuestions,
  validateOllamaConnection
};
