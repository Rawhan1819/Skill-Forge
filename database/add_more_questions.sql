-- Add more questions for all categories
USE quiz_platform;

-- ========================================
-- MATHEMATICS QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(1, 'easy', 'What is 48 ÷ 6?', '6', '7', '8', '9', 'C', '48 divided by 6 equals 8'),
(1, 'easy', 'What is 9 × 9?', '72', '81', '90', '99', 'B', '9 times 9 equals 81'),
(1, 'easy', 'What is 100 - 45?', '45', '50', '55', '60', 'C', '100 minus 45 equals 55'),
(1, 'easy', 'What is 13 + 28?', '39', '40', '41', '42', 'C', '13 plus 28 equals 41'),
(1, 'easy', 'What is 7 × 8?', '54', '56', '58', '60', 'B', '7 times 8 equals 56'),
(1, 'easy', 'What is 72 ÷ 8?', '8', '9', '10', '11', 'B', '72 divided by 8 equals 9'),
(1, 'easy', 'What is 15 × 4?', '50', '55', '60', '65', 'C', '15 times 4 equals 60'),
(1, 'easy', 'What is 35 + 47?', '80', '81', '82', '83', 'C', '35 plus 47 equals 82');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(1, 'medium', 'What is 25% of 80?', '15', '20', '25', '30', 'B', '25% of 80 = (25/100) × 80 = 20'),
(1, 'medium', 'What is the square root of 169?', '11', '12', '13', '14', 'C', 'The square root of 169 is 13'),
(1, 'medium', 'What is 8²?', '56', '64', '72', '80', 'B', '8 squared (8 × 8) equals 64'),
(1, 'medium', 'If x - 7 = 15, what is x?', '20', '21', '22', '23', 'C', 'x = 15 + 7 = 22'),
(1, 'medium', 'What is 3/4 + 1/4?', '1/2', '3/8', '1', '4/8', 'C', '3/4 + 1/4 = 4/4 = 1'),
(1, 'medium', 'What is 15% of 200?', '25', '30', '35', '40', 'B', '15% of 200 = 30'),
(1, 'medium', 'What is 12 × 12?', '124', '134', '144', '154', 'C', '12 times 12 equals 144'),
(1, 'medium', 'What is 2³?', '6', '8', '9', '12', 'B', '2 cubed (2 × 2 × 2) equals 8');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(1, 'hard', 'What is the value of π to 3 decimal places?', '3.141', '3.142', '3.143', '3.144', 'B', 'Pi is approximately 3.14159, which rounds to 3.142'),
(1, 'hard', 'Solve: 3x + 5 = 20', 'x = 3', 'x = 4', 'x = 5', 'x = 6', 'C', '3x = 20 - 5 = 15, so x = 15/3 = 5'),
(1, 'hard', 'What is the area of a circle with radius 5? (Use π ≈ 3.14)', '78.5', '157', '31.4', '62.8', 'A', 'Area = πr² = 3.14 × 5² = 78.5'),
(1, 'hard', 'What is 7! (7 factorial)?', '5040', '720', '49', '343', 'A', '7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040'),
(1, 'hard', 'Solve: 2(x + 3) = 16', 'x = 4', 'x = 5', 'x = 6', 'x = 7', 'B', '2x + 6 = 16, 2x = 10, x = 5'),
(1, 'hard', 'What is the Pythagorean theorem formula?', 'a + b = c', 'a² + b² = c²', 'a × b = c', 'a² - b² = c²', 'B', 'The Pythagorean theorem states a² + b² = c²');

-- ========================================
-- SCIENCE QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(2, 'easy', 'What is the boiling point of water?', '90°C', '100°C', '110°C', '120°C', 'B', 'Water boils at 100°C at standard atmospheric pressure'),
(2, 'easy', 'Which planet is closest to the Sun?', 'Venus', 'Earth', 'Mercury', 'Mars', 'C', 'Mercury is the closest planet to the Sun'),
(2, 'easy', 'What gas do humans breathe in?', 'Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen', 'B', 'Humans breathe in oxygen and exhale carbon dioxide'),
(2, 'easy', 'How many bones are in the human body?', '196', '206', '216', '226', 'B', 'An adult human has 206 bones'),
(2, 'easy', 'What is the largest organ in the human body?', 'Heart', 'Brain', 'Liver', 'Skin', 'D', 'The skin is the largest organ'),
(2, 'easy', 'What is the center of an atom called?', 'Electron', 'Proton', 'Nucleus', 'Neutron', 'C', 'The nucleus is at the center of an atom'),
(2, 'easy', 'Which force pulls objects toward Earth?', 'Friction', 'Gravity', 'Magnetism', 'Tension', 'B', 'Gravity pulls objects toward the center of Earth'),
(2, 'easy', 'What is the chemical symbol for gold?', 'Go', 'Gd', 'Au', 'Ag', 'C', 'Au is the chemical symbol for gold (from Latin: aurum)');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(2, 'medium', 'What is photosynthesis?', 'Breathing', 'Making food from sunlight', 'Cell division', 'Digestion', 'B', 'Photosynthesis is how plants make food using sunlight'),
(2, 'medium', 'What is the pH of pure water?', '5', '6', '7', '8', 'C', 'Pure water has a neutral pH of 7'),
(2, 'medium', 'What type of blood cells fight infection?', 'Red blood cells', 'White blood cells', 'Platelets', 'Plasma', 'B', 'White blood cells defend against infections'),
(2, 'medium', 'What is the smallest unit of life?', 'Atom', 'Molecule', 'Cell', 'Organ', 'C', 'The cell is the smallest unit of life'),
(2, 'medium', 'Which element has atomic number 1?', 'Helium', 'Hydrogen', 'Oxygen', 'Carbon', 'B', 'Hydrogen has atomic number 1'),
(2, 'medium', 'What is the freezing point of water in Fahrenheit?', '0°F', '32°F', '100°F', '212°F', 'B', 'Water freezes at 32°F or 0°C'),
(2, 'medium', 'What is DNA short for?', 'Deoxyribonucleic Acid', 'Dynamic Nuclear Acid', 'Dinitrogen Acid', 'Deoxy Natural Acid', 'A', 'DNA stands for Deoxyribonucleic Acid'),
(2, 'medium', 'Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'B', 'Mars appears red due to iron oxide on its surface');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(2, 'hard', 'What is Avogadro''s number approximately?', '6.02 × 10²³', '3.14 × 10²³', '9.81 × 10²³', '1.60 × 10²³', 'A', 'Avogadro''s number is 6.022 × 10²³ particles per mole'),
(2, 'hard', 'What is the speed of light in vacuum?', '300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s', 'A', 'Light travels at approximately 299,792 km/s in vacuum'),
(2, 'hard', 'What is the process of cell division called?', 'Photosynthesis', 'Respiration', 'Mitosis', 'Osmosis', 'C', 'Mitosis is the process of cell division'),
(2, 'hard', 'What is the most abundant gas in Earth''s atmosphere?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon', 'C', 'Nitrogen makes up about 78% of Earth''s atmosphere'),
(2, 'hard', 'What is the chemical formula for glucose?', 'C₆H₁₂O₆', 'H₂O', 'CO₂', 'CH₄', 'A', 'Glucose has the formula C₆H₁₂O₆');

-- ========================================
-- SOCIAL STUDIES QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(3, 'easy', 'What is the capital of India?', 'Mumbai', 'New Delhi', 'Kolkata', 'Chennai', 'B', 'New Delhi is the capital of India'),
(3, 'easy', 'How many continents are there?', '5', '6', '7', '8', 'C', 'There are 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America'),
(3, 'easy', 'What is the longest river in the world?', 'Amazon', 'Nile', 'Yangtze', 'Mississippi', 'B', 'The Nile River is approximately 6,650 km long'),
(3, 'easy', 'Which ocean is the largest?', 'Atlantic', 'Indian', 'Arctic', 'Pacific', 'D', 'The Pacific Ocean is the largest ocean'),
(3, 'easy', 'What is the capital of England?', 'Manchester', 'London', 'Birmingham', 'Liverpool', 'B', 'London is the capital of England'),
(3, 'easy', 'Which country is known as the Land of the Rising Sun?', 'China', 'Japan', 'Korea', 'Thailand', 'B', 'Japan is called the Land of the Rising Sun'),
(3, 'easy', 'What is the tallest mountain in the world?', 'K2', 'Mount Everest', 'Kilimanjaro', 'Denali', 'B', 'Mount Everest at 8,848.86 meters is the tallest'),
(3, 'easy', 'Which continent is Egypt in?', 'Asia', 'Africa', 'Europe', 'Australia', 'B', 'Egypt is located in Africa');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(3, 'medium', 'In which year did World War II end?', '1943', '1944', '1945', '1946', 'C', 'World War II ended in 1945'),
(3, 'medium', 'Who was the first person to walk on the moon?', 'Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn', 'B', 'Neil Armstrong walked on the moon in 1969'),
(3, 'medium', 'What is the capital of Australia?', 'Sydney', 'Melbourne', 'Canberra', 'Brisbane', 'C', 'Canberra is the capital of Australia'),
(3, 'medium', 'Which ancient wonder still stands today?', 'Colossus of Rhodes', 'Great Pyramid of Giza', 'Hanging Gardens', 'Lighthouse of Alexandria', 'B', 'The Great Pyramid of Giza is the only ancient wonder still standing'),
(3, 'medium', 'What year did India gain independence?', '1945', '1946', '1947', '1948', 'C', 'India gained independence on August 15, 1947'),
(3, 'medium', 'Which empire built Machu Picchu?', 'Aztec', 'Maya', 'Inca', 'Olmec', 'C', 'The Inca Empire built Machu Picchu around 1450 AD'),
(3, 'medium', 'What is the smallest country in the world?', 'Monaco', 'Vatican City', 'San Marino', 'Liechtenstein', 'B', 'Vatican City is the smallest country at 0.44 km²');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(3, 'hard', 'Who wrote "The Republic"?', 'Aristotle', 'Socrates', 'Plato', 'Homer', 'C', 'Plato wrote "The Republic" around 380 BC'),
(3, 'hard', 'In which year did the Berlin Wall fall?', '1987', '1988', '1989', '1990', 'C', 'The Berlin Wall fell on November 9, 1989'),
(3, 'hard', 'What was the ancient trade route between East and West called?', 'Spice Route', 'Silk Road', 'King''s Highway', 'Amber Road', 'B', 'The Silk Road connected Asia and Europe'),
(3, 'hard', 'Which battle marked the end of Napoleon''s rule?', 'Battle of Austerlitz', 'Battle of Waterloo', 'Battle of Leipzig', 'Battle of Borodino', 'B', 'Napoleon was defeated at Waterloo in 1815');

-- ========================================
-- GENERAL KNOWLEDGE QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(4, 'easy', 'How many colors are in a rainbow?', '5', '6', '7', '8', 'C', 'A rainbow has 7 colors: red, orange, yellow, green, blue, indigo, violet'),
(4, 'easy', 'What is the capital of the USA?', 'New York', 'Los Angeles', 'Washington D.C.', 'Chicago', 'C', 'Washington D.C. is the capital of the United States'),
(4, 'easy', 'How many hours are in a day?', '12', '24', '36', '48', 'B', 'There are 24 hours in a day'),
(4, 'easy', 'What is the largest mammal?', 'Elephant', 'Blue Whale', 'Giraffe', 'Rhino', 'B', 'The blue whale is the largest mammal'),
(4, 'easy', 'How many sides does a triangle have?', '2', '3', '4', '5', 'B', 'A triangle has 3 sides'),
(4, 'easy', 'What is the fastest land animal?', 'Lion', 'Cheetah', 'Leopard', 'Tiger', 'B', 'The cheetah can run up to 120 km/h'),
(4, 'easy', 'How many minutes are in an hour?', '50', '60', '70', '80', 'B', 'There are 60 minutes in an hour'),
(4, 'easy', 'What is the currency of Japan?', 'Yuan', 'Won', 'Yen', 'Rupee', 'C', 'The Japanese currency is the Yen');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(4, 'medium', 'Who painted the Mona Lisa?', 'Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello', 'B', 'Leonardo da Vinci painted the Mona Lisa in the early 1500s'),
(4, 'medium', 'What is the hardest natural substance?', 'Gold', 'Iron', 'Diamond', 'Platinum', 'C', 'Diamond is the hardest natural substance'),
(4, 'medium', 'Which country invented pizza?', 'France', 'Italy', 'Greece', 'Spain', 'B', 'Pizza originated in Naples, Italy'),
(4, 'medium', 'What is the smallest prime number?', '0', '1', '2', '3', 'C', '2 is the smallest prime number'),
(4, 'medium', 'Who wrote "Hamlet"?', 'Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain', 'B', 'William Shakespeare wrote Hamlet around 1600'),
(4, 'medium', 'What is the main ingredient in guacamole?', 'Tomato', 'Avocado', 'Pepper', 'Onion', 'B', 'Guacamole is primarily made from avocados'),
(4, 'medium', 'How many keys does a standard piano have?', '76', '82', '88', '92', 'C', 'A standard piano has 88 keys');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(4, 'hard', 'What year was the first iPhone released?', '2005', '2006', '2007', '2008', 'C', 'The first iPhone was released in 2007'),
(4, 'hard', 'Which element has the chemical symbol W?', 'Tungsten', 'Tin', 'Titanium', 'Thallium', 'A', 'W represents Tungsten (from German: Wolfram)'),
(4, 'hard', 'What is the rarest blood type?', 'O negative', 'AB negative', 'B negative', 'A negative', 'B', 'AB negative is the rarest blood type');

-- ========================================
-- PYTHON QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(5, 'easy', 'What symbol is used for comments in Python?', '//', '#', '/*', '--', 'B', '# is used for single-line comments in Python'),
(5, 'easy', 'Which data type is used to store text?', 'int', 'float', 'str', 'bool', 'C', 'str (string) is used to store text'),
(5, 'easy', 'What does print() do?', 'Deletes data', 'Displays output', 'Saves file', 'Creates variable', 'B', 'print() displays output to the console'),
(5, 'easy', 'Which operator is used for exponentiation?', '^', '**', '^^', 'exp()', 'B', '** is the exponentiation operator in Python'),
(5, 'easy', 'What is the correct way to create a variable?', 'int x = 5', 'x = 5', 'var x = 5', 'x := 5', 'B', 'Python uses simple assignment: x = 5'),
(5, 'easy', 'Which method converts string to lowercase?', 'lower()', 'toLower()', 'lowercase()', 'down()', 'A', 'lower() method converts string to lowercase'),
(5, 'easy', 'What is the output of: 5 // 2', '2', '2.5', '3', '2.0', 'A', '// is floor division which returns 2'),
(5, 'easy', 'Which collection type is ordered and changeable?', 'Set', 'Tuple', 'List', 'Dictionary', 'C', 'Lists are ordered and changeable');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(5, 'medium', 'What is a lambda function?', 'A loop', 'An anonymous function', 'A class', 'A module', 'B', 'Lambda functions are small anonymous functions'),
(5, 'medium', 'What does the range(5) function return?', '1,2,3,4,5', '0,1,2,3,4', '0,1,2,3,4,5', '1,2,3,4', 'B', 'range(5) returns 0,1,2,3,4'),
(5, 'medium', 'Which method adds an element to the end of a list?', 'add()', 'append()', 'insert()', 'push()', 'B', 'append() adds an element to the end of a list'),
(5, 'medium', 'What is the output of: len("Hello")', '4', '5', '6', 'Error', 'B', 'len() returns the length of the string, which is 5'),
(5, 'medium', 'What keyword is used to create a class?', 'class', 'Class', 'def', 'object', 'A', 'The "class" keyword is used to create a class'),
(5, 'medium', 'What does the continue statement do?', 'Exits loop', 'Skips to next iteration', 'Pauses execution', 'Ends program', 'B', 'continue skips to the next iteration of a loop'),
(5, 'medium', 'What is the correct way to import a module?', 'include math', 'import math', 'using math', 'require math', 'B', 'Use "import module_name" to import modules');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(5, 'hard', 'What is a decorator in Python?', 'A comment', 'A function modifier', 'A variable', 'A loop', 'B', 'Decorators modify the behavior of functions'),
(5, 'hard', 'What does __init__ do?', 'Initializes a class', 'Ends a program', 'Imports a module', 'Creates a loop', 'A', '__init__ is the constructor method in Python'),
(5, 'hard', 'What is the output of: bool([])', 'True', 'False', 'None', 'Error', 'B', 'An empty list evaluates to False'),
(5, 'hard', 'What is list comprehension?', 'A loop type', 'A concise way to create lists', 'A module', 'A class', 'B', 'List comprehension is a compact syntax for creating lists');

-- ========================================
-- JAVASCRIPT QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(6, 'easy', 'How do you declare a variable in JS?', 'variable x', 'var x', 'int x', 'x variable', 'B', 'Use var, let, or const to declare variables'),
(6, 'easy', 'What is the correct syntax for a comment?', '# comment', '// comment', '-- comment', '/* comment', 'B', '// is used for single-line comments'),
(6, 'easy', 'Which method displays an alert box?', 'alert()', 'msg()', 'message()', 'show()', 'A', 'alert() displays a popup alert box'),
(6, 'easy', 'What does console.log() do?', 'Creates variable', 'Prints to console', 'Deletes data', 'Loops code', 'B', 'console.log() outputs messages to the console'),
(6, 'easy', 'Which operator is used for equality?', '=', '==', 'equals', 'is', 'B', '== checks for equality (=== for strict equality)'),
(6, 'easy', 'What is the correct way to write an IF statement?', 'if x = 5', 'if (x == 5)', 'if x == 5 then', 'if [x == 5]', 'B', 'Use if (condition) syntax'),
(6, 'easy', 'Which event occurs when a user clicks an element?', 'onchange', 'onmouseover', 'onclick', 'onhover', 'C', 'onclick event fires when an element is clicked'),
(6, 'easy', 'What is the correct syntax for a function?', 'func myFunc()', 'function myFunc()', 'def myFunc()', 'Function myFunc()', 'B', 'Use function keyword to declare functions');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(6, 'medium', 'What is the difference between let and var?', 'No difference', 'let is block-scoped', 'var is faster', 'let is deprecated', 'B', 'let has block scope while var has function scope'),
(6, 'medium', 'What does JSON stand for?', 'JavaScript Object Notation', 'Java Source Object Notation', 'JavaScript Online Notation', 'Java Script Object Name', 'A', 'JSON stands for JavaScript Object Notation'),
(6, 'medium', 'Which method converts JSON to object?', 'JSON.parse()', 'JSON.toObject()', 'JSON.convert()', 'JSON.decode()', 'A', 'JSON.parse() converts JSON string to object'),
(6, 'medium', 'What is a callback function?', 'A built-in function', 'A function passed as argument', 'A loop', 'An error handler', 'B', 'A callback is a function passed to another function'),
(6, 'medium', 'What does the map() method do?', 'Creates a map', 'Transforms each element', 'Finds an element', 'Sorts array', 'B', 'map() creates a new array with transformed elements'),
(6, 'medium', 'What is the output of: typeof null', 'null', 'undefined', 'object', 'number', 'C', 'typeof null returns "object" (a known quirk)');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(6, 'hard', 'What is a closure in JavaScript?', 'A loop', 'Function with preserved scope', 'An object', 'A class', 'B', 'A closure is a function that remembers its outer variables'),
(6, 'hard', 'What is event bubbling?', 'Error handling', 'Events propagating up the DOM', 'Animation', 'Data sorting', 'B', 'Event bubbling is when events propagate from child to parent'),
(6, 'hard', 'What is the purpose of Promise.all()?', 'Waits for all promises', 'Creates a promise', 'Cancels promises', 'Delays execution', 'A', 'Promise.all() waits for all promises to resolve');

-- ========================================
-- JAVA QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(7, 'easy', 'What is the extension of Java files?', '.java', '.jv', '.class', '.jar', 'A', 'Java source files have .java extension'),
(7, 'easy', 'Which keyword is used to create a class?', 'Class', 'class', 'new', 'object', 'B', 'Use lowercase "class" keyword'),
(7, 'easy', 'What is the correct syntax to output text?', 'print("Hello")', 'System.out.println("Hello")', 'echo "Hello"', 'console.log("Hello")', 'B', 'Use System.out.println() in Java'),
(7, 'easy', 'Which data type stores whole numbers?', 'float', 'double', 'int', 'String', 'C', 'int stores integer values'),
(7, 'easy', 'What does JVM stand for?', 'Java Virtual Machine', 'Java Visual Machine', 'Java Variable Method', 'Java Version Manager', 'A', 'JVM is Java Virtual Machine'),
(7, 'easy', 'Which keyword is used for inheritance?', 'implements', 'inherits', 'extends', 'derives', 'C', 'extends keyword is used for inheritance'),
(7, 'easy', 'What is the main method signature?', 'public main()', 'static void main()', 'public static void main(String[] args)', 'main(String args)', 'C', 'Main method must have this exact signature');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(7, 'medium', 'What is polymorphism?', 'Many forms', 'One form', 'No form', 'Fixed form', 'A', 'Polymorphism means "many forms"'),
(7, 'medium', 'What is the difference between == and .equals()?', 'No difference', '== compares references, .
equals() compares values', '== is faster', '.equals() is deprecated', 'B', '== compares object references while .equals() compares content'),
(7, 'medium', 'What is encapsulation?', 'Code hiding', 'Data binding', 'Method overloading', 'Inheritance', 'A', 'Encapsulation is hiding internal details'),
(7, 'medium', 'Which collection is ordered and allows duplicates?', 'Set', 'Map', 'List', 'Queue', 'C', 'List is ordered and allows duplicate elements'),
(7, 'medium', 'What is a constructor?', 'A method', 'A special method to initialize objects', 'A variable', 'A class', 'B', 'Constructor initializes new objects'),
(7, 'medium', 'What does the final keyword do?', 'Makes variable constant', 'Ends program', 'Creates loop', 'Imports package', 'A', 'final makes variables constant');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(7, 'hard', 'What is the difference between abstract class and interface?', 'No difference', 'Abstract can have concrete methods', 'Interface is faster', 'Abstract is deprecated', 'B', 'Abstract classes can have implemented methods'),
(7, 'hard', 'What is garbage collection?', 'Deleting files', 'Automatic memory management', 'Error handling', 'Code optimization', 'B', 'Garbage collection automatically frees unused memory'),
(7, 'hard', 'What is a thread in Java?', 'A string', 'A lightweight process', 'A variable', 'A class', 'B', 'A thread is a lightweight subprocess');

-- ========================================
-- C++ QUESTIONS
-- ========================================

-- Easy
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(8, 'easy', 'What is the extension of C++ files?', '.c', '.cpp', '.c++', '.cp', 'B', 'C++ files typically have .cpp extension'),
(8, 'easy', 'Which header is needed for cout?', '<stdio.h>', '<iostream>', '<cout>', '<output>', 'B', 'iostream header is needed for cout'),
(8, 'easy', 'What is the correct syntax for output?', 'print()', 'cout <<', 'System.out', 'printf()', 'B', 'Use cout << for output in C++'),
(8, 'easy', 'Which symbol is used for input?', '>>', '<<', '<>', '><', 'A', '>> is used with cin for input'),
(8, 'easy', 'What is the main function return type?', 'void', 'int', 'char', 'float', 'B', 'main() typically returns int'),
(8, 'easy', 'Which operator is used to access class members?', '->', '.', '::', '&', 'B', '. (dot) is used to access members'),
(8, 'easy', 'What does endl do?', 'Ends program', 'New line', 'Deletes line', 'Pauses', 'B', 'endl inserts a new line');

-- Medium
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(8, 'medium', 'What is a pointer?', 'A variable storing address', 'A function', 'A class', 'A loop', 'A', 'Pointers store memory addresses'),
(8, 'medium', 'What is the difference between malloc and new?', 'No difference', 'new is type-safe', 'malloc is faster', 'new is deprecated', 'B', 'new is type-safe and calls constructors'),
(8, 'medium', 'What is function overloading?', 'Same name, different parameters', 'Different names', 'No parameters', 'Same parameters', 'A', 'Function overloading allows same name with different parameters'),
(8, 'medium', 'What is a reference in C++?', 'A pointer', 'An alias to a variable', 'A function', 'A class', 'B', 'A reference is an alias for another variable'),
(8, 'medium', 'What does virtual keyword do?', 'Creates variable', 'Enables polymorphism', 'Ends function', 'Imports library', 'B', 'virtual enables runtime polymorphism');

-- Hard
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(8, 'hard', 'What is RAII?', 'Random Access', 'Resource Acquisition Is Initialization', 'Runtime Analysis', 'Reference Assignment', 'B', 'RAII ties resource lifetime to object lifetime'),
(8, 'hard', 'What is the difference between delete and delete[]?', 'No difference', 'delete[] for arrays', 'delete is faster', 'delete[] is deprecated', 'B', 'delete[] is used to deallocate arrays'),
(8, 'hard', 'What is a template in C++?', 'A class', 'Generic programming feature', 'A function', 'A variable', 'B', 'Templates enable generic programming');
