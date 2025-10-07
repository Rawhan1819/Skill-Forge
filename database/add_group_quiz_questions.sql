USE quiz_platform;

-- Get the category IDs for the new subjects
-- Compiler Design questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
-- ✅ EASY (10 Questions)
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'What is the first phase of a compiler?', 'Syntax Analysis', 'Lexical Analysis', 'Semantic Analysis', 'Code Generation', 'B', 'Lexical Analysis is the first phase that converts source code into tokens.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which tool is used to generate lexical analyzers?', 'LEX', 'YACC', 'ANTLR', 'BISON', 'A', 'LEX is used to generate lexical analyzers automatically.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which phase constructs a parse tree?', 'Semantic Analysis', 'Syntax Analysis', 'Code Generation', 'Optimization', 'B', 'Syntax analysis constructs a parse tree from tokens.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'What is the role of a parser?', 'Check type compatibility', 'Check syntax of the program', 'Generate tokens', 'Allocate memory', 'B', 'The parser checks if the token sequence follows grammar rules.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which structure stores information about identifiers?', 'Parse tree', 'Symbol Table', 'Flow Graph', 'DAG', 'B', 'Symbol tables store identifier names, types, and scopes.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which component of compiler checks type correctness?', 'Syntax Analyzer', 'Semantic Analyzer', 'Code Optimizer', 'Assembler', 'B', 'Semantic analyzer ensures variables and expressions are type-correct.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which phase of the compiler generates target machine code?', 'Code Optimization', 'Lexical Analysis', 'Code Generation', 'Syntax Analysis', 'C', 'Code generation translates intermediate code into target machine code.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'What does LEX produce as output?', 'Tokens', 'C source code for lexical analyzer', 'Parse Tree', 'Intermediate Code', 'B', 'LEX produces C source code implementing the lexical analyzer.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'What is the purpose of code optimization?', 'To reduce code size and improve performance', 'To increase code length', 'To check syntax', 'To handle errors', 'A', 'Code optimization improves performance and efficiency of compiled code.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'easy', 'Which form represents intermediate code using at most three operands?', 'Syntax Tree', 'DAG', 'Three Address Code', 'Machine Code', 'C', 'Three Address Code represents intermediate code with at most three operands.'),

-- ✅ MEDIUM (10 Questions)
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is bootstrapping in compilers?', 'Optimizing code using loops', 'Writing a compiler in its own language', 'Using YACC for grammar parsing', 'Eliminating redundancy', 'B', 'Bootstrapping means writing a compiler in the same language it compiles.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is the role of the lexical analyzer?', 'Translate tokens into syntax tree', 'Convert characters into tokens', 'Generate intermediate code', 'Perform register allocation', 'B', 'Lexical analyzer converts characters into meaningful tokens.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'Which of the following defines context-free grammar?', 'Grammar for regular languages', 'Grammar independent of context', 'Grammar using context-sensitive rules', 'Grammar with recursion only', 'B', 'Context-free grammars use rules that are independent of context.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is the purpose of FIRST and FOLLOW sets?', 'For token generation', 'For constructing predictive parsing tables', 'For symbol table construction', 'For optimization', 'B', 'FIRST and FOLLOW are used to build LL(1) predictive parsing tables.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'Which data structure is used in recursive descent parsing?', 'Stack', 'Queue', 'Graph', 'Tree', 'A', 'Recursive descent parsing uses stack implicitly via recursion.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is the purpose of Syntax Directed Definitions (SDD)?', 'To represent optimization rules', 'To define semantics using grammar', 'To perform code generation', 'To create parsing tables', 'B', 'SDDs attach semantic rules to grammar productions.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'Which of the following is an intermediate representation in compilers?', 'Source code', 'Machine code', 'Three-address code', 'Binary code', 'C', 'Three-address code serves as an intermediate representation.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is the role of the activation record?', 'Hold local variables and return address', 'Store intermediate code', 'Keep grammar rules', 'Perform type checking', 'A', 'Activation records store local variables, parameters, and return information.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'Which phase of compiler uses DAGs?', 'Lexical Analysis', 'Optimization', 'Semantic Analysis', 'Code Generation', 'B', 'DAGs help detect common subexpressions during optimization.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'medium', 'What is register allocation?', 'Assigning variables to CPU registers efficiently', 'Removing unused code', 'Optimizing loops', 'Parsing grammar', 'A', 'Register allocation maps frequently used variables to CPU registers for efficiency.'),

-- ✅ HARD (10 Questions)
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'Which algorithm constructs LR parsing tables?', 'CYK Algorithm', 'Knuth’s LR(1) Algorithm', 'Cocke–Younger–Kasami', 'Dijkstra’s Algorithm', 'B', 'Knuth’s LR(1) algorithm constructs LR parsing tables for bottom-up parsing.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What makes a grammar ambiguous?', 'Having multiple parse trees for a string', 'Having no start symbol', 'Having left recursion', 'Having right recursion', 'A', 'A grammar is ambiguous if a string can have more than one parse tree.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What is peephole optimization?', 'Optimizing at instruction level', 'Optimizing loops only', 'Removing tokens', 'Improving parsing speed', 'A', 'Peephole optimization replaces small instruction sequences with efficient alternatives.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What is a flow graph?', 'Representation of grammar rules', 'Graph showing control flow between basic blocks', 'Symbol table layout', 'Intermediate code table', 'B', 'A flow graph shows control flow between basic blocks in a program.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'Which optimization technique eliminates loop-invariant computations?', 'Loop unrolling', 'Constant propagation', 'Loop optimization', 'Dead code elimination', 'C', 'Loop optimization removes computations that do not change within a loop.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'Which structure helps identify common subexpressions?', 'Syntax Tree', 'Parse Tree', 'DAG', 'Flow Graph', 'C', 'DAGs detect and eliminate common subexpressions to optimize code.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What is a Data Flow Equation used for?', 'Register allocation', 'Tracking how data values propagate through the program', 'Syntax checking', 'Error recovery', 'B', 'Data flow equations describe how information moves through a program for optimization.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'In predictive parsing, what condition must be met for grammar to be LL(1)?', 'No ambiguity and no left recursion', 'Ambiguity allowed', 'Right recursion only', 'Left recursion allowed', 'A', 'LL(1) grammar must be non-ambiguous and free from left recursion.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'Which issue is faced during code generation?', 'Handling grammar ambiguity', 'Register allocation and instruction selection', 'Lexical error detection', 'Symbol table creation', 'B', 'Code generation must efficiently handle register allocation and instruction selection.'),
((SELECT id FROM categories WHERE name = 'Compiler Design'), 'hard', 'What is the main advantage of using intermediate code?', 'Improves parsing speed', 'Provides machine independence', 'Simplifies lexical analysis', 'Eliminates optimization needs', 'B', 'Intermediate code provides a platform-independent representation between source and target languages.');


-- Computer Networks questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
-- ✅ EASY (10 QUESTIONS)
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which device connects multiple computers within a LAN?', 'Router', 'Switch', 'Modem', 'Repeater', 'B', 'A switch connects multiple computers within a LAN and forwards data only to the destination device.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'What does LAN stand for?', 'Local Area Network', 'Large Access Network', 'Logical Area Node', 'Linked Access Network', 'A', 'LAN stands for Local Area Network.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which of the following uses packet switching?', 'Telephone Network', 'Internet', 'Television Network', 'Satellite Communication', 'B', 'Internet uses packet switching to send data in packets across networks.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which protocol is used for sending emails?', 'FTP', 'SMTP', 'HTTP', 'SNMP', 'B', 'SMTP (Simple Mail Transfer Protocol) is used for sending emails.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'What is the main function of the Transport Layer?', 'Error detection', 'Routing packets', 'Reliable data delivery', 'Signal modulation', 'C', 'The transport layer provides reliable data transfer between end systems.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which command is used to test if a host is reachable?', 'Ping', 'Tracert', 'Telnet', 'Pathping', 'A', 'Ping checks connectivity by sending ICMP echo requests.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which protocol provides connectionless transport service?', 'TCP', 'UDP', 'FTP', 'HTTP', 'B', 'UDP provides connectionless and unreliable data delivery.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which layer is responsible for logical addressing (IP addresses)?', 'Application Layer', 'Network Layer', 'Transport Layer', 'Link Layer', 'B', 'The network layer assigns logical IP addresses and handles routing.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'Which device is used to connect different networks?', 'Hub', 'Router', 'Switch', 'Repeater', 'B', 'Routers connect different networks and forward packets based on IP addresses.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'easy', 'What does DNS stand for?', 'Domain Network System', 'Domain Name System', 'Data Number System', 'Distributed Name Server', 'B', 'DNS stands for Domain Name System, which translates domain names to IP addresses.'),

-- ✅ MEDIUM (10 QUESTIONS)
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is throughput in a computer network?', 'Total number of packets sent', 'Rate of successful data delivery over a network', 'Amount of delay in the network', 'Number of collisions in the network', 'B', 'Throughput is the rate of successful message delivery over a communication channel.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'Which protocol provides reliable transport service?', 'UDP', 'HTTP', 'TCP', 'DNS', 'C', 'TCP ensures reliable, ordered, and error-checked delivery of data.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is multiplexing in transport layer?', 'Combining multiple signals for transmission over a single channel', 'Routing packets between networks', 'Error correction mechanism', 'Encrypting packets', 'A', 'Multiplexing allows multiple data streams to share the same communication channel.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'Which of the following is NOT an application layer protocol?', 'HTTP', 'FTP', 'IP', 'SMTP', 'C', 'IP operates at the network layer, not the application layer.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'Which routing algorithm uses the Bellman-Ford method?', 'Link State Routing', 'Distance Vector Routing', 'Dijkstra’s Algorithm', 'Flooding', 'B', 'Distance vector routing uses Bellman-Ford algorithm to compute shortest paths.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is the role of ARP (Address Resolution Protocol)?', 'Maps IP address to MAC address', 'Resolves domain names', 'Routes packets', 'Detects collisions', 'A', 'ARP maps a host’s IP address to its corresponding MAC address.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is the default port number for HTTP?', '21', '25', '80', '110', 'C', 'HTTP runs on port 80 by default.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'Which transport layer mechanism ensures data is received in order?', 'Checksum', 'Sequence Number', 'Timer', 'Header', 'B', 'Sequence numbers in TCP ensure that data segments are received and reassembled in order.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is the function of the Link Layer?', 'Error detection and frame transmission between adjacent nodes', 'Routing packets between networks', 'Providing logical addressing', 'Providing email services', 'A', 'The Link Layer handles reliable transmission between physically connected nodes.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'medium', 'What is the main purpose of VLANs?', 'To connect wireless devices', 'To separate logical networks within a physical LAN', 'To speed up routing', 'To encrypt packets', 'B', 'VLANs logically divide a single physical network into multiple virtual networks.'),

-- ✅ HARD (10 QUESTIONS)
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'What type of delay is caused by the time required to process a packet header?', 'Propagation delay', 'Transmission delay', 'Processing delay', 'Queueing delay', 'C', 'Processing delay occurs when routers examine packet headers and make forwarding decisions.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'In TCP congestion control, what happens during slow start?', 'The congestion window increases linearly', 'The congestion window increases exponentially', 'The congestion window decreases exponentially', 'The connection resets', 'B', 'During slow start, TCP increases the congestion window exponentially until threshold is reached.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'Which routing algorithm uses link-state advertisements and Dijkstra’s algorithm?', 'Distance Vector', 'Link State', 'Flooding', 'Path Vector', 'B', 'Link state routing uses Dijkstra’s algorithm to compute shortest paths.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'In IP addressing, what is CIDR?', 'Classful Inter-Domain Routing', 'Classless Inter-Domain Routing', 'Centralized Internet Data Routing', 'Connectionless Internet Data Relay', 'B', 'CIDR (Classless Inter-Domain Routing) replaces classful addressing for efficient allocation.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'Which protocol is used by Ping command?', 'TCP', 'ICMP', 'UDP', 'ARP', 'B', 'Ping uses ICMP (Internet Control Message Protocol) to send echo requests and replies.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'What is jitter in networking?', 'Variation in packet delay', 'Average propagation delay', 'Loss of packets', 'Bandwidth fluctuation', 'A', 'Jitter is the variation in packet delay during transmission.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'Which protocol provides host-to-host communication in the Internet layer?', 'ARP', 'TCP', 'UDP', 'IP', 'D', 'The IP protocol provides host-to-host communication in the network layer.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'In Ethernet, what is the purpose of CSMA/CD?', 'Error correction', 'Collision detection and avoidance', 'Routing', 'Encryption', 'B', 'CSMA/CD detects collisions in shared Ethernet media and helps avoid retransmission errors.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'What is the difference between Unicast and Multicast transmission?', 'Unicast sends to one receiver; Multicast sends to multiple specific receivers', 'Unicast sends to all; Multicast sends to one', 'Both send to all devices', 'Unicast sends to broadcast address', 'A', 'Unicast is one-to-one communication; multicast is one-to-many to specific receivers.'),
((SELECT id FROM categories WHERE name = 'Computer Networks'), 'hard', 'Which command is used to trace the route packets take to a destination?', 'Ping', 'Tracert', 'Nslookup', 'Pathping', 'B', 'Tracert traces the route that packets follow to reach a destination.');


-- Data Mining questions
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'easy', 'What is data mining?', 'Mining minerals', 'Extracting patterns from data', 'Database backup', 'Data deletion', 'B', 'Data mining is the process of discovering patterns and knowledge from large amounts of data'),
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'medium', 'Which algorithm is used for association rule mining?', 'K-means', 'Apriori', 'Decision Tree', 'SVM', 'B', 'Apriori algorithm is commonly used for mining frequent itemsets and association rules'),
((SELECT id FROM categories WHERE name = 'Data Mining Techniques'), 'hard', 'What is the support value in association rules?', 'Confidence measure', 'Frequency of itemset', 'Correlation coefficient', 'Standard deviation', 'B', 'Support is the frequency of occurrence of an itemset in the dataset');

-- Machine Learning questions
-- =============================
-- MACHINE LEARNING QUIZ QUESTIONS
-- =============================

-- EASY LEVEL
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'What is the main goal of machine learning?', 'To write code manually', 'To discover patterns and make predictions from data', 'To store datasets efficiently', 'To perform data visualization only', 'B', 'Machine Learning aims to extract patterns from data to make predictions or decisions'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which of the following is a type of supervised learning?', 'Clustering', 'Regression', 'Dimensionality Reduction', 'Self-Organizing Maps', 'B', 'Regression is a supervised learning technique where models are trained on labeled data'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which of the following is a type of unsupervised learning?', 'Linear Regression', 'Decision Tree', 'K-Means Clustering', 'Logistic Regression', 'C', 'K-Means is an unsupervised learning technique for grouping data'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'What is overfitting in a machine learning model?', 'Model performs poorly on training data', 'Model performs well on unseen data', 'Model performs well on training data but poorly on test data', 'Model does not learn anything', 'C', 'Overfitting occurs when a model memorizes training data and fails to generalize'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which Python library is commonly used for machine learning?', 'Matplotlib', 'Scikit-Learn', 'NumPy', 'Pandas', 'B', 'Scikit-Learn provides many machine learning algorithms and tools'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which metric measures the ratio of correctly predicted positive observations to all predicted positives?', 'Accuracy', 'Precision', 'Recall', 'F1 Score', 'B', 'Precision = TP / (TP + FP), measuring exactness of positive predictions'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'What does SMOTE technique address?', 'Feature scaling', 'Data imbalance', 'Dimensionality reduction', 'Clustering evaluation', 'B', 'SMOTE generates synthetic samples to balance imbalanced datasets'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which loss function is used for regression tasks?', 'Cross-Entropy Loss', 'Mean Squared Error', 'Hinge Loss', 'KL Divergence', 'B', 'Mean Squared Error is commonly used to measure error in regression'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which of the following is used for encoding categorical variables?', 'Standardization', 'One-Hot Encoding', 'SMOTE', 'Polynomial Regression', 'B', 'One-Hot Encoding converts categorical features into numeric binary vectors'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'easy', 'Which method splits the dataset into training and test sets?', 'Resampling', 'Feature Scaling', 'Data Splitting', 'PCA', 'C', 'Data splitting separates data into training and testing subsets for model evaluation');

-- MEDIUM LEVEL
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'What is the purpose of Ridge regression?', 'Reduce bias', 'Prevent overfitting by regularization', 'Perform clustering', 'Encode categorical data', 'B', 'Ridge adds L2 regularization to penalize large coefficients and prevent overfitting'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which feature selection method uses model performance to select features?', 'Filter method', 'Wrapper method', 'Embedded method', 'Normalization', 'B', 'Wrapper methods use the predictive model to evaluate feature subsets'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which dimensionality reduction technique maximizes variance along principal components?', 'Linear Discriminant Analysis', 'PCA', 'SMOTE', 'Chi-Square Test', 'B', 'Principal Component Analysis identifies directions of maximum variance'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which ensemble method combines multiple models by averaging their predictions?', 'Bagging', 'Boosting', 'Stacking', 'Voting', 'A', 'Bagging reduces variance by averaging predictions from multiple models trained on bootstrapped datasets'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which activation function is commonly used in hidden layers of neural networks?', 'Sigmoid', 'ReLU', 'Softmax', 'Linear', 'B', 'ReLU introduces non-linearity and helps avoid vanishing gradient problems'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'What does k-fold cross-validation help to estimate?', 'Bias only', 'Model generalization performance', 'Variance only', 'Dataset size', 'B', 'k-fold cross-validation evaluates model performance on multiple subsets to estimate generalization'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which algorithm is used for multi-class classification?', 'Logistic Regression', 'Decision Tree', 'Random Forest', 'All of the above', 'D', 'All mentioned algorithms can handle multi-class classification problems'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which method balances data by duplicating minority samples?', 'Random Under Sampling', 'Random Over Sampling', 'SMOTE', 'ADASYN', 'B', 'Random Over Sampling replicates minority class examples to balance the dataset'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which evaluation metric combines precision and recall?', 'Accuracy', 'ROC AUC', 'F1 Score', 'Mean Squared Error', 'C', 'F1 Score is the harmonic mean of precision and recall'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'medium', 'Which ensemble method sequentially trains models to correct previous errors?', 'Bagging', 'Boosting', 'Voting', 'Stacking', 'B', 'Boosting focuses on misclassified examples in sequential learning');

-- HARD LEVEL
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which technique is used to reduce multicollinearity in regression?', 'PCA', 'Ridge Regression', 'LASSO Regression', 'All of the above', 'D', 'PCA, Ridge, and LASSO are all used to mitigate multicollinearity issues'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'What is the main challenge in high-dimensional data for ML?', 'Overfitting', 'Underfitting', 'Lack of data', 'Missing labels', 'A', 'High-dimensional data increases risk of overfitting'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which method generates synthetic minority examples adaptively?', 'SMOTE', 'ADASYN', 'Random Oversampling', 'Random Undersampling', 'B', 'ADASYN generates synthetic samples based on difficulty of classification for minority class'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'In a neural network, which method updates weights to minimize loss?', 'Activation function', 'Gradient Descent', 'Regularization', 'Cross Validation', 'B', 'Gradient Descent optimizes weights to reduce the loss function'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which ensemble method uses meta-model to combine base models?', 'Bagging', 'Boosting', 'Stacking', 'Voting', 'C', 'Stacking combines predictions of multiple models using a meta-learner'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which clustering method projects data into lower dimension before clustering?', 'K-Means', 'Spectral Clustering', 'Fuzzy C-Means', 'Self-Organizing Maps', 'B', 'Spectral clustering uses eigenvectors of similarity matrix to reduce dimensionality'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which regression technique performs feature selection by shrinking coefficients to zero?', 'Ridge Regression', 'LASSO Regression', 'Polynomial Regression', 'Linear Regression', 'B', 'LASSO regression can set some coefficients exactly to zero, performing feature selection'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which method is used to evaluate classifier performance on imbalanced datasets?', 'Accuracy', 'Precision-Recall Curve', 'Ridge Regression', 'Mean Squared Error', 'B', 'Precision-Recall curve is more informative than accuracy for imbalanced data'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which neural network algorithm uses backpropagation to update weights?', 'Perceptron Learning', 'Multi-Layer Perceptron', 'k-NN', 'Decision Tree', 'B', 'MLP uses backpropagation with gradient descent to train multiple layers'),

((SELECT id FROM categories WHERE name = 'Machine Learning'), 'hard', 'Which method clusters data while allowing partial membership of points in multiple clusters?', 'K-Means', 'Fuzzy C-Means', 'Hierarchical Clustering', 'Spectral Clustering', 'B', 'Fuzzy C-Means assigns membership degrees for points in all clusters');

-- AI questions
-- ✅ EASY LEVEL QUESTIONS
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What does AI stand for?', 'Automatic Integration', 'Artificial Intelligence', 'Automated Internet', 'Advanced Interface', 'B', 'AI stands for Artificial Intelligence — simulation of human intelligence by machines.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'Which of the following is an example of an AI system?', 'Calculator', 'Autonomous car', 'Word processor', 'Digital watch', 'B', 'Autonomous cars use AI for perception, planning, and decision making.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What is an intelligent agent?', 'A device that reacts to the environment', 'A device that only stores data', 'A static system', 'A random process', 'A', 'An intelligent agent perceives its environment and takes actions to achieve goals.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What is the goal of Artificial Intelligence?', 'To make machines think and act like humans', 'To build faster hardware', 'To store more data', 'To create websites', 'A', 'The goal of AI is to build systems that can perform tasks that require human intelligence.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'Which of the following is NOT an AI application?', 'Speech recognition', 'Image classification', 'Playing chess', 'File compression', 'D', 'File compression is not an AI task; it uses data encoding algorithms.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'The term “Artificial Intelligence” was first coined by?', 'Alan Turing', 'John McCarthy', 'Herbert Simon', 'Marvin Minsky', 'B', 'John McCarthy coined the term “Artificial Intelligence” in 1956.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'Which environment has both deterministic and stochastic characteristics?', 'Fully observable', 'Partially observable', 'Uncertain environment', 'Sequential environment', 'C', 'An uncertain environment has unpredictable elements, making it stochastic.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What is a rational agent?', 'An agent that always wins', 'An agent that acts to achieve the best expected outcome', 'An agent that repeats actions', 'An agent that ignores its goals', 'B', 'A rational agent chooses actions that maximize expected performance.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'What does the environment provide to an AI agent?', 'Intelligence', 'Percepts', 'Knowledge', 'Memory', 'B', 'An environment provides percepts which the agent perceives through sensors.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'easy', 'Which search method explores all nodes at one depth before moving to the next?', 'DFS', 'BFS', 'Hill climbing', 'A*', 'B', 'Breadth-First Search explores all nodes at one depth level before moving deeper.');

-- ✅ MEDIUM LEVEL QUESTIONS
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'Which search algorithm uses heuristics?', 'BFS', 'DFS', 'A* algorithm', 'Uniform-cost search', 'C', 'A* algorithm combines path cost and heuristic estimates for efficient search.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'What is a heuristic function used for?', 'To improve algorithm speed', 'To estimate cost from current node to goal', 'To store explored nodes', 'To generate random paths', 'B', 'Heuristic functions estimate the cost of reaching the goal from the current node.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'Which algorithm is an example of uninformed search?', 'A*', 'Greedy Best-First', 'Breadth First Search', 'Hill Climbing', 'C', 'BFS is uninformed because it does not use any domain knowledge.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'In the Missionaries and Cannibals problem, what is the main constraint?', 'Boat capacity', 'Cannibals cannot outnumber missionaries', 'Water flow direction', 'Crossing time', 'B', 'The missionaries must never be outnumbered by cannibals on any bank.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'Which search algorithm is used in game playing?', 'DFS', 'Minimax', 'Linear search', 'Gradient descent', 'B', 'The Minimax algorithm is used for decision making in adversarial games.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'What is Alpha-Beta pruning used for?', 'Optimizing neural networks', 'Reducing number of nodes evaluated in Minimax', 'Improving regression', 'Simplifying logic inference', 'B', 'Alpha-Beta pruning cuts off branches that cannot influence the final decision.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'What does the A* algorithm combine?', 'DFS and BFS', 'Path cost and heuristic', 'Alpha and Beta', 'State and Action', 'B', 'A* combines the path cost (g) and heuristic (h) to find optimal solutions.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'Which search strategy always expands the lowest cost node?', 'DFS', 'Greedy Best-First', 'Uniform Cost Search', 'Hill Climbing', 'C', 'Uniform Cost Search expands the node with the lowest total cost.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'In propositional logic, which rule is used for deduction?', 'Resolution', 'Classification', 'Backtracking', 'Chaining', 'A', 'Resolution is a rule of inference used for propositional and first-order logic.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'medium', 'What is backward chaining primarily used for?', 'Forward reasoning', 'Goal-driven reasoning', 'Random search', 'Neural computation', 'B', 'Backward chaining starts from the goal and works backward to find supporting facts.');

-- ✅ HARD LEVEL QUESTIONS
INSERT INTO questions (category_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'Which of the following best describes the AO* algorithm?', 'A graph-based search using AND-OR trees', 'A simple BFS variant', 'An optimization for regression', 'A neural network approach', 'A', 'AO* uses AND-OR graphs to represent problems that can be divided into subproblems.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'In hill climbing, which of the following issues can occur?', 'Optimality', 'Local maxima', 'Infinite branching', 'Memory overflow', 'B', 'Hill climbing may get stuck at local maxima or plateaus.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'What does Alpha represent in Alpha-Beta pruning?', 'Maximum lower bound of possible solutions', 'Heuristic cost', 'Estimated path value', 'Depth of search', 'A', 'Alpha represents the best already explored option along the path for the maximizer.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'Which logic is used to represent knowledge with quantifiers?', 'Propositional logic', 'First order logic', 'Predicate-free logic', 'Modal logic', 'B', 'First Order Logic introduces quantifiers and variables for expressing complex knowledge.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'Which planning method uses a partially ordered set of actions?', 'State space search', 'Partial order planning', 'Backward chaining', 'Regression planning', 'B', 'Partial order planning allows flexibility by not fixing action order unnecessarily.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'What does the ID3 algorithm use to split nodes in decision trees?', 'Variance reduction', 'Information gain', 'Gini index', 'Heuristic function', 'B', 'ID3 uses information gain based on entropy to choose the best attribute split.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'In reinforcement learning, what guides the agent’s actions?', 'Rewards and punishments', 'Supervised data labels', 'Heuristic cost', 'Logical inference', 'A', 'Reinforcement learning uses rewards and penalties to optimize actions.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'In the Wumpus World, what indicates the presence of a pit?', 'Glitter', 'Breeze', 'Stench', 'Arrow', 'B', 'A breeze in adjacent cells indicates a nearby pit.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'Which algorithm can be used to solve the 8-puzzle problem efficiently?', 'BFS', 'DFS', 'A* algorithm', 'Linear search', 'C', 'A* algorithm efficiently solves puzzles by combining path cost and heuristics.'),
((SELECT id FROM categories WHERE name = 'Introduction to Artificial Intelligence'), 'hard', 'What is the main goal of knowledge representation?', 'To store data', 'To enable reasoning about the world', 'To visualize data', 'To build hardware', 'B', 'Knowledge representation allows systems to reason logically about information.');

-- Add more questions for each subject (10 per difficulty level recommended)
