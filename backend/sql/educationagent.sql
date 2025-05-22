CREATE DATABASE IF NOT EXISTS `educationAgent`;
USE `educationAgent`;

CREATE TABLE user (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	JoinDate TIMESTAMP NOT NULL DEFAULT NOW(),
	language_preference VARCHAR(50)
);

CREATE TABLE lesson (
	lesson_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at DATETIME
);

CREATE TABLE exercise_lesson (
	exLesson_id INT AUTO_INCREMENT PRIMARY KEY,
	lesson_id INT,
	question_text TEXT NOT NULL,
	option1 VARCHAR(255) NOT NULL,
	option2 VARCHAR(255) NOT NULL,
	option3 VARCHAR(255) NOT NULL,
	option4 VARCHAR(255) NOT NULL,
	correct_option CHAR(1) NOT NULL,
	explanation TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id)
);

CREATE TABLE feedback (
	feedback_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	lesson_id INT,
	content TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id)
);

CREATE TABLE youtube (
	youtube_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	url VARCHAR(255),
	language VARCHAR(50),
	duration INT,
);

CREATE TABLE EXERCISE_YT (
	exYT_id INT AUTO_INCREMENT PRIMARY KEY,
	youtube_id INT,
	question_text TEXT NOT NULL,
	option1 VARCHAR(255) NOT NULL,
	option2 VARCHAR(255) NOT NULL,
	option3 VARCHAR(255) NOT NULL,
	option4 VARCHAR(255) NOT NULL,
	correct_option CHAR(1) NOT NULL,
	explanation TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (youtube_id) REFERENCES youtube(youtube_id)
);

CREATE TABLE learnStat (
	user_id INT PRIMARY KEY,
	total_attempts INT NOT NULL DEFAULT 0,
	correct_attempts INT NOT NULL DEFAULT 0,
	correct_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
	total_score INT NOT NULL DEFAULT 0,
	energy_remaining INT NOT NULL DEFAULT 100,
	last_learned_at DATETIME,
	FOREIGN KEY (user_id) REFERENCE user(user_id)
);

CREATE TABLE learn (
	user_id INT,
	lesson_id INT,
	learn_at DATETIME,
	PRIMARY KEY (user_id, lesson_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (lesson_id) REFERENCE lesson(lesson_id)
);

CREATE TABLE lesson_test (
	user_id INT,
	exLesson_id INT,
	answer CHAR(1),
	is_correct BOOLEAN,
	score INT,
	answer_at DATETIME,
	PRIMARY KEY (user_id, exLesson_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (exLesson_id) REFERENCES exercise_lesson(exLesson_id)
);

CREATE TABLE YT_test (
	user_id INT,
	exYT_id INT,
	answer CHAR(1),
	is_correct BOOLEAN,
	score INT,
	answer_at DATETIME,
	PRIMARY KEY (user_id, exLesson_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (exYT_id) REFERENCES exercise_YT(exYT_id)
);

CREATE TABLE watch (
	user_id INT,
	youtube_id INT,
	watched_at DATETIME,
	progress_percent DECIMAL(5,2),
	PRIMARY KEY (user_id, youtube_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (youtube_id) REFERENCES youtube(youtube_id)
);