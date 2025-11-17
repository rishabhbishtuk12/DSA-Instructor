// src/components/ChatInput.jsx
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaStop } from "react-icons/fa6";

export default function ChatInput({ onSend, onStop, isGenerating, onRetry }) {
  const [text, setText] = useState("");
  const inputRef = useRef();

  const triggerSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  useEffect(() => {
    // expose retry globally for error component (keeps parity with original script)
    window.retryLastMessage = onRetry;
  }, [onRetry]);

  useEffect(() => {
    // handle Enter key
    const el = inputRef.current;
    const handler = e => {
      if (e.key === "Enter" && !isGenerating) {
        e.preventDefault();
        triggerSend();
      }
    };
    el?.addEventListener("keypress", handler);
    return () => el?.removeEventListener("keypress", handler);
  }, [isGenerating, text]);

  return (
    <div className="chat-input fixed bottom-0 left-1/2 -translate-x-1/2 z-10 w-full md:w-1/2 p-4 flex gap-2">
      <div className="relative flex items-center flex-1">
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          id="user-input"
          placeholder="Ask anything about DSA"
          className="w-full px-4 py-2 sm:px-4 sm:py-3 text-sm bg-gray-200 text-zinc-800  rounded-full focus:outline-none transition-all duration-300"
        />

        {!isGenerating ? (
          <button
            onClick={triggerSend}
            type="button"
            title="Send"
            className="bg-sky-600 hover:bg-sky-500 absolute right-1 flex rounded-full p-1.5 sm:p-2.25"
          >
            <IoSend className="text-white text-base sm:text-lg" />
          </button>
        ) : (
          <button
            onClick={onStop}
            type="button"
            title="Stop"
            className="bg-sky-600 hover:bg-sky-500 absolute right-1 flex rounded-full p-1.5 sm:p-2.25"
          >
            <FaStop className="text-white text-base" />
          </button>
        )}
      </div>
    </div>
  );
}
