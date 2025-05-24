import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: number;
  name: string;
  language: string;
  category: string;
}

const LessonListPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:8000/lessons/");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">📚 課程列表</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gradient-to-br from-purple-700 to-indigo-700 p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{lesson.name}</h2>
            <p className="text-sm text-white/80">🌐 語言：{lesson.language}</p>
            <p className="text-sm text-white/80">🏷️ 類別：{lesson.category}</p>
            <button
              onClick={() => navigate(`/practice/${lesson.id}`)}
              className="mt-3 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              開始學習
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonListPage;

