import React, { useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";

export default function ChatMessage({ message }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    // highlight code blocks
    const blocks = ref.current.querySelectorAll("pre code");
    blocks.forEach(block => hljs.highlightElement(block));
  }, [message.content]);

  useEffect(() => {
    if (ref.current && message.role === "ai") {
      // highlight code blocks inside marked content
      const nodes = ref.current.querySelectorAll("pre code");
      nodes.forEach(block => hljs.highlightElement(block));
    }
  }, [message.content, message.role]);

  if (message.role === "user") {
    return (
      <div className="relative message p-1.5 max-w-[80%] self-end bg-sky-600 rounded-xl flex">
        <span className="text-white text-sm self-center px-2">
          {message.content}
        </span>
        <span className="text-zinc-100 text-[10px] self-end">
          {message.timestamp}
        </span>
      </div>
    );
  }

  if (message.role === "error") {
    return (
      <div
        className="self-start ai-message error-message p-3 max-w-[80%]"
        ref={ref}
      >
        <div className="flex items-start">
          <i className="ri-error-warning-line text-red-500 mr-2 mt-1" />
          <div>
            <p className="text-red-800 font-medium">{message.content}</p>
            <div className="mt-2">
              <button
                onClick={() => window.retryLastMessage?.()}
                className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-500"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.role === "thinking") {
    return (
      <div className="self-start">
        <div className="bg-transparent rounded-xl p-3 w-24 animate-pulse">
          <div className="flex gap-1 justify-center">
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      </div>
    );
  }

  // AI message (markdown)
  return (
    <div
      className="relative message p-1.5 max-w-[80%] self-start rounded-xl flex bg-zinc-100"
      ref={ref}
    >
      <span
        className="ai-message text-sm text-black self-center px-2"
        dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
      />
      <span className="text-zinc-400 text-[10px] self-end">
        {message.timestamp}
      </span>
    </div>
  );
}
