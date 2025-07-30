import React, { useEffect, useRef } from "react";

import { useMessageHistory, MessageSender } from "../logic";

export const MessageHistory: React.FC = () => {
  const { messages } = useMessageHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) return;

    // Smooth auto-scroll to bottom
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
    >
      {messages.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-8">
          Start chatting with Wayne...
        </div>
      )}
      
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex flex-col gap-1 max-w-[280px] animate-in slide-in-from-bottom-2 duration-300 ${
            message.sender === MessageSender.CLIENT
              ? "self-end items-end ml-auto"
              : "self-start items-start"
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`rounded-lg px-3 py-2 shadow-sm message-bubble ${
            message.sender === MessageSender.CLIENT
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-white border border-gray-600"
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            {message.sender === MessageSender.AVATAR ? "Wayne" : "You"}
          </p>
        </div>
      ))}
    </div>
  );
};
