import React, { useState } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // ⏳ 模擬 AI 回應（之後可串後端）
    const fakeReply: Message = {
      role: "ai",
      content: `AI 回應：「${input}」的問題真有趣！`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, fakeReply]);
    }, 800);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded max-w-xl ${
              msg.role === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-3 rounded text-black"
          placeholder="輸入訊息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          發送
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
