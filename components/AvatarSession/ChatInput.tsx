import React, { useState } from "react";
import { useTextChat } from "../logic/useTextChat";

export const ChatInput: React.FC = () => {
  const { sendMessage } = useTextChat();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      return;
    }
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Send me message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 bg-gray-800"
      />
      <button 
        onClick={handleSend}
        className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-gray-800 rounded-lg border border-gray-600 hover:border-blue-500"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
}; 