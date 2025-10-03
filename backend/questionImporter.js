// questionImporter.js - Bulk import questions into database
// Run with: node questionImporter.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// Sample question bank - Add more questions here
const questionBank = {
  mathematics: [
    {
      difficulty: 'easy',
      question: 'What is 25 + 37?',
      options: ['60', '62', '64', '66'],
      correctAnswer: 'B',
      explanation: '25 + 37 = 62'
    },
    {
      difficulty: 'easy',
      question: 'What is 12 × 5?',
      options: ['50', '55', '60', '65'],
      correctAnswer: 'C',
      explanation: '12 × 5 = 60'
    },
    {
      difficulty: 'medium',
      question: 'What is the value of π (pi) rounded to 2 decimal places?',
      options: ['3.12', '3.14', '3.16', '3.18'],
      correctAnswer: 'B',
      explanation: 'Pi is approximately 3.14159, which rounds to 3.14'
    },
    {
      difficulty: 'medium',
      question: 'If x + 5 = 12, what is x?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 'C',
      explanation: 'x = 12 - 5 = 7'
    },
    {
      difficulty: 'hard',
      question: 'What is the sum of angles in a triangle?',
      options: ['90°', '180°', '270°', '360°'],
      correctAnswer: 'B',
      explanation: 'The sum of all angles in any triangle is always 180 degrees'
    }
  ],
  science: [
    {
      difficulty: 'easy',
      question: 'How many planets are in our solar system?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 'B',
      explanation: 'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune'
    },
    {
      difficulty: 'easy',
      question: 'What gas do plants absorb from the atmosphere?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      correctAnswer: 'C',
      explanation: 'Plants absorb CO2 during photosynthesis and release oxygen'
    },
    {
      difficulty: 'medium',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
      correctAnswer: 'B',
      explanation: 'Mitochondria produce energy (ATP) for the cell'
    },
    {
      difficulty: 'medium',
      question: 'What is the chemical formula for table salt?',
      options: ['NaCl', 'KCl', 'CaCl2', 'MgCl2'],
      correctAnswer: 'A',
      explanation: 'Table salt is Sodium Chloride (NaCl)'
    },
    {
      difficulty: 'hard',
      question: 'What is the speed of sound in air at room temperature?',
      options: ['243 m/s', '343 m/s', '443 m/s', '543 m/s'],
      correctAnswer: 'B',
      explanation: 'Sound travels at approximately 343 meters per second in air at 20°C'
    }
  ],
  social: [
    {
      difficulty: 'easy',
      question: 'Who was the first President of the United States?',
      options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
      correctAnswer: 'B',
      explanation: 'George Washington served as the first U.S. President from 1789 to 1797'
    },
    {
      difficulty: 'easy',
      question: 'What is the largest continent by land area?',
      options: ['Africa', 'Europe', 'Asia', 'North America'],
      correctAnswer: 'C',
      explanation: 'Asia is the largest continent, covering about 44.58 million km²'
    },
    {
      difficulty: 'medium',
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 'C',
      explanation: 'World War II ended in 1945 with the surrender of Japan'
    },
    {
      difficulty: 'medium',
      question: 'What is the longest river in the world?',
      options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
      correctAnswer: 'B',
      explanation: 'The Nile River is approximately 6,650 km long'
    },
    {
      difficulty: 'hard',
      question: 'Which empire built Machu Picchu?',
      options: ['Aztec', 'Maya', 'Inca', 'Olmec'],
      correctAnswer: 'C',
      explanation: 'Machu Picchu was built by the Inca Empire around 1450 AD'
    }
  ],
  generalKnowledge: [
    {
      difficulty: 'easy',
      question: 'How many days are in a leap year?',
      options: ['364', '365', '366', '367'],
      correctAnswer: 'C',
      explanation: 'A leap year has 366 days, with February having 29 days'
    },
    {
      difficulty: 'easy',
      question: 'What is the capital of Japan?',
      options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'],
      correctAnswer: 'C',
      explanation: 'Tokyo is the capital and largest city of Japan'
    },
    {
      difficulty: 'medium',
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 'B',
      explanation: 'William Shakespeare wrote this famous tragedy around 1594-1596'
    },
    {
      difficulty: 'medium',
      question: 'What is the tallest mountain in the world?',
      options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
      correctAnswer: 'C',
      explanation: 'Mount Everest stands at 8,848.86 meters above sea level'
    },
    {
      difficulty: 'hard',
      question: 'In which year did the Titanic sink?',
      options: ['1910', '1911', '1912', '1913'],
      correctAnswer: 'C',
      explanation: 'The RMS Titanic sank on April 15, 1912'
    }
  ],
  python: [
    {
      difficulty: 'easy',
      question: 'Which keyword is used to create a function in Python?',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 'B',
      explanation: 'The "def" keyword is used to define functions in Python'
    },
    {
      difficulty: 'easy',
      question: 'What is the correct file extension for Python files?',
      options: ['.python', '.py', '.pt', '.pyt'],
      correctAnswer: 'B',
      explanation: 'Python files use the .py extension'
    },
    {
      difficulty: 'medium',
      question: 'What does the len() function do in Python?',
      options: ['Returns length', 'Creates list', 'Deletes item', 'Sorts data'],
      correctAnswer: 'A',
      explanation: 'len() returns the number of items in an object'
    },
    {
      difficulty: 'medium',
      question: 'Which data type is mutable in Python?',
      options: ['Tuple', 'String', 'List', 'Integer'],
      correctAnswer: 'C',
      explanation: 'Lists are mutable, meaning they can be modified after creation'
    },
    {
      difficulty: 'hard',
      question: 'What is the output of: print(type({}))',
      options: ["<class 'set'>", "<class 'dict'>", "<class 'list'>", "<class 'tuple'>"],
      correctAnswer: 'B',
      explanation: '{} creates an empty dictionary in Python'
    }
  ],
  javascript: [
    {
      difficulty: 'easy',
      question: 'Which symbol is used for single-line comments in JavaScript?',
      options: ['//', '/*', '#', '--'],
      correctAnswer: 'A',
      explanation: '// is used for single-line comments in JavaScript'
    },
    {
      difficulty: 'easy',
      question: 'What keyword declares a constant in JavaScript?',
      options: ['var', 'let', 'const', 'constant'],
      correctAnswer: 'C',
      explanation: 'const is used to declare constants that cannot be reassigned'
    },
    {
      difficulty: 'medium',
      question: 'What does === check in JavaScript?',
      options: ['Value only', 'Type only', 'Value and type', 'Reference'],
      correctAnswer: 'C',
      explanation: '=== is the strict equality operator that checks both value and type'
    },
    {
      difficulty: 'medium',
      question: 'Which method adds an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswer: 'A',
      explanation: 'push() adds one or more elements to the end of an array'
    },
    {
      difficulty: 'hard',
      question: 'What is the result of: typeof null',
      options: ["'null'", "'undefined'", "'object'", "'number'"],
      correctAnswer: 'C',
      explanation: 'This is a known JavaScript quirk - typeof null returns "object"'
    }
  ]
};

async function importQuestions() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'quiz_platform'
    });

    console.log('✅ Connected to database');

    // Get category IDs
    const [categories] = await connection.query('SELECT id, name FROM categories');
    const categoryMap = {};
    categories.forEach(cat => {
      const key = cat.name.toLowerCase().replace(/\s+/g, '');
      if (key.includes('math')) categoryMap.mathematics = cat.id;
      else if (key.includes('science')) categoryMap.science = cat.id;
      else if (key.includes('social')) categoryMap.social = cat.id;
      else if (key.includes('general') || key.includes('gk')) categoryMap.generalKnowledge = cat.id;
      else if (key.includes('python')) categoryMap.python = cat.id;
      else if (key.includes('javascript')) categoryMap.javascript = cat.id;
    });

    console.log('📋 Category mapping:', categoryMap);

    let totalInserted = 0;

    // Insert questions for each category
    for (const [category, questions] of Object.entries(questionBank)) {
      const categoryId = categoryMap[category];
      
      if (!categoryId) {
        console.log(`⚠️  Category ${category} not found in database, skipping...`);
        continue;
      }

      console.log(`\n📝 Importing ${questions.length} questions for ${category}...`);

      for (const q of questions) {
        try {
          await connection.query(
            `INSERT INTO questions 
            (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              categoryId,
              q.difficulty,
              q.question,
              q.options[0],
              q.options[1],
              q.options[2],
              q.options[3],
              q.correctAnswer,
              q.explanation
            ]
          );
          totalInserted++;
        } catch (err) {
          console.error(`❌ Error inserting question: ${q.question}`, err.message);
        }
      }
    }

    console.log(`\n✅ Successfully imported ${totalInserted} questions!`);

    // Show summary
    const [summary] = await connection.query(`
      SELECT c.name, q.difficulty, COUNT(*) as count
      FROM questions q
      JOIN categories c ON q.category_id = c.id
      GROUP BY c.name, q.difficulty
      ORDER BY c.name, q.difficulty
    `);

    console.log('\n📊 Question Summary by Category and Difficulty:');
    console.table(summary);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the importer
importQuestions();