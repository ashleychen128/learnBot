-- 我先照有的功能寫出幾個應該要具備的functions，放好之後可以刪，不適合的也刪，以下會備註是幹嘛的

-- 創建帳號
INSERT INTO user
(name, email, password, language_preference)
VALUES (%s, %s, %s, %s);

-- user更改問題(密碼或是語言偏好)
SELECT user_id
FROM user
WHERE email = %s;

UPDATE user
SET password = %s
WHERE user_id = %s;

UPDATE user
SET language_preference = %s
WHERE user_id = %s

-- 生成學習內容 (description = content) 我下面有alter lesson, 加了language and category
INSERT INTO lesson
(title, description, difficulty, language, category)
VALUES (%s, %s, %s);

-- 更新內容
UPDATE lesson
SET description = %s, updated_at = now()
WHERE lesson_id = %s;

-- 複合實體learn 記錄學習時間與是哪位user
INSERT INTO learn
(user_id, lesson_id, learn_at)
VALUES(%s, %s, %s);

-- 使用者作回饋
INSERT INTO lesson
(user_id, lesson_id, content)
VALUES (%s, %s, %s);

-- 根據lesson內容產生題目
INSERT INTO exercise_lesson
(lesson_id, question_text, option1, option2, option3, option4, correct_option, explanation)
VALUES(%s, %s, %s, %s, %s, %s, %s, %s);

-- 複合實體 lesson_test 紀錄學生填答正確率及答案等 answer_at是記錄答題時間 now()
INSERT INTO lesson_test
(user_id, exLesson_id, answer, is_correct, score, answer_at)
VALUES(%s, %s, %s, %s, %s, %s);

-- 產生使用者學習數據
INSERT INTO learnStat
(user_id, total_attempts, correct_attempts, correct_rate, total_score, energy_remaining, last_learned_at)
VALUES(%s, %s, %s, %s, %s, %s, %s);

-- 根據使用者語言偏好與使用者搜索做篩選
ALTER TABLE lesson
ADD language VARCHAR(50),
ADD category VARCHAR(100);

SELECT l.lesson_id, l.title, l.description
FROM lesson l
JOIN user u ON u.user_id = %s  
WHERE l.language = u.language_preference
  AND (l.title LIKE CONCAT('%', %s, '%') OR l.description LIKE CONCAT('%', %s, '%'));

-- 課程分類
SELECT category, title
FROM lesson
ORDER BY category, title;

SELECT title
FROM lesson
WHERE category = %s;

-- 即時更新使用者學習數據 能量減少取決於你們設計的系統
UPDATE learnStat
SET total_attempts = total_attempts + 1,
    correct_attempts = correct_attempts + %s,
    total_score = total_score + %s,
    energy_remaining = energy_remaining - %s
WHERE user_id = %s;

-- 產生學習重點 先新增欄位
ALTER TABLE lesson
ADD COLUMN summary TEXT AFTER description;
-- INSERT INTO?? 我先用UPDATE
UPDATE lesson
SET summary = %s
WHERE lesson_id = %s;

-- 更新上次學習時間 now()
UPDATE learnStat
SET last_learned_at = %s
WHERE user_id = %s;

-- 連續未學習天數超過n天或近期表現 correct_attempts/total_attempts小於0.33 做風險評估 回傳
SELECT user_id
FROM learnStat
WHERE (last_learned_at IS NULL OR DATEDIFF(NOW(), last_learned_at) > %s)
OR (total_attempts > 0 AND correct_attempts / total_attempts < 0.33);

-- 連續未學習天數超過n天 回傳
SELECT user_id
FROM learnStat
WHERE last_learned_at IS NULL OR DATEDIFF(NOW(), last_learned_at) > %s;

-- 彙整該學生學習數據 回傳all
SELECT u.username, ls.*
FROM learnStat ls
JOIN user u ON ls.user_id = u.user_id
WHERE ls.user_id = %s;

-- 根據學生有學習過得category，推薦lesson
SELECT l2.lesson_id, l2.title
FROM learn l
JOIN lesson l1 ON l.lesson_id = l1.lesson_id
JOIN lesson l2 ON l1.category = l2.category
WHERE l.user_id = %s
  AND l2.lesson_id NOT IN (
      SELECT lesson_id FROM learn WHERE user_id = %s
  )
GROUP BY l2.lesson_id, l2.title
ORDER BY COUNT(*) DESC
LIMIT 5;
