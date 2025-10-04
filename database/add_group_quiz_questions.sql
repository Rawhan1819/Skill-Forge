USE quiz_platform;

-- Get the category IDs for the new subjects
-- Compiler Design questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'What is the first phase of a compiler?', 'Syntax Analysis', 'Lexical Analysis', 'Semantic Analysis', 'Code Generation', 'B', 'Lexical Analysis is the first phase where source code is converted to tokens'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'Which data structure is used in recursive descent parsing?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 'Recursive descent parsing uses a stack implicitly through function calls'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What is the purpose of three-address code?', 'Source code representation', 'Intermediate representation', 'Machine code', 'Assembly code', 'B', 'Three-address code is an intermediate representation used in compilers');

-- Computer Networks questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'How many layers are in the OSI model?', '5', '7', '9', '4', 'B', 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'Which protocol operates at the Transport layer?', 'IP', 'TCP', 'HTTP', 'ARP', 'B', 'TCP (Transmission Control Protocol) operates at the Transport layer'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'What is the subnet mask for a /26 network?', '255.255.255.0', '255.255.255.192', '255.255.255.128', '255.255.255.224', 'B', 'A /26 network has 26 network bits, resulting in subnet mask 255.255.255.192');

-- Data Mining questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'easy', 'What is data mining?', 'Mining minerals', 'Extracting patterns from data', 'Database backup', 'Data deletion', 'B', 'Data mining is the process of discovering patterns and knowledge from large amounts of data'),
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'medium', 'Which algorithm is used for association rule mining?', 'K-means', 'Apriori', 'Decision Tree', 'SVM', 'B', 'Apriori algorithm is commonly used for mining frequent itemsets and association rules'),
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'hard', 'What is the support value in association rules?', 'Confidence measure', 'Frequency of itemset', 'Correlation coefficient', 'Standard deviation', 'B', 'Support is the frequency of occurrence of an itemset in the dataset');

-- Machine Learning questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'What is supervised learning?', 'Learning without labels', 'Learning with labeled data', 'Unsupervised clustering', 'Reinforcement learning', 'B', 'Supervised learning uses labeled training data to learn patterns'),
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which is a classification algorithm?', 'K-means', 'Linear Regression', 'Decision Tree', 'PCA', 'C', 'Decision Tree is a classification algorithm that splits data based on features'),
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'What is overfitting in machine learning?', 'Underfitting the data', 'Model performs well on training but poor on test data', 'High bias', 'Low variance', 'B', 'Overfitting occurs when a model learns training data too well, including noise');

-- AI questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What is AI?', 'Alien Intelligence', 'Artificial Intelligence', 'Automated Industry', 'Advanced Internet', 'B', 'AI stands for Artificial Intelligence - simulation of human intelligence by machines'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'Which search algorithm uses heuristics?', 'BFS', 'DFS', 'A* algorithm', 'Linear Search', 'C', 'A* algorithm uses heuristic functions to guide the search efficiently'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'What is the Turing Test?', 'CPU performance test', 'Test of machine intelligence', 'Memory test', 'Network speed test', 'B', 'The Turing Test evaluates a machines ability to exhibit intelligent behavior indistinguishable from a human');

-- Add more questions for each subject (10 per difficulty level recommended)
