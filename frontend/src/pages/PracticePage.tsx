import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "什麼是人工智慧（AI）？",
    options: ["一種水果", "一門研究讓機器思考的技術", "一種表演藝術", "一種天氣現象"],
    answer: "一門研究讓機器思考的技術",
  },
  {
    id: 2,
    question: "Python 是哪種類型的程式語言？",
    options: ["低階語言", "機器碼", "高階語言", "火龍語"],
    answer: "高階語言",
  },
];

const PracticePage = () => {
  const { lessonId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const question = sampleQuestions[currentIndex];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSelected(null);
      setSubmitted(false);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  if (!question) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">✅ 恭喜！你完成了所有練習題！</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">練習題 - 課程 {lessonId}</h1>
      <div className="bg-gray-800 rounded p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Q{currentIndex + 1}: {question.question}</h2>
        <ul className="space-y-2">
          {question.options.map((option) => (
            <li
              key={option}
              onClick={() => !submitted && setSelected(option)}
              className={`p-2 rounded cursor-pointer ${
                selected === option ? "bg-blue-500" : "bg-gray-700"
              } ${submitted && option === question.answer ? "border border-green-400" : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
        {selected && !submitted && (
          <button
            className="mt-4 bg-white text-black px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            送出答案
          </button>
        )}
        {submitted && (
          <p className="mt-4">
            {selected === question.answer ? "✅ 正確！" : "❌ 錯誤，正確答案是：" + question.answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
