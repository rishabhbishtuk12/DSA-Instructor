// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import AiThinking from "../components/AiThinking"; // <-- NEW
import useAutoScroll from "../hooks/useAutoScroll";
import { AuthContext } from "../context/AuthContext";
import { PiArrowDownBold } from "react-icons/pi";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState("");

  const { containerRef, showButton, maintainBottom, scrollToBottom } =
    useAutoScroll();

  const typingIntervalRef = useRef(null);

  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Helper to add message
  const appendMessage = msg => {
    setMessages(prev => [
      ...prev,
      { id: Math.trunc(Date.now() + Math.random()), ...msg },
    ]);
  };

  // Stop button handler
  const stopGeneration = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsGenerating(false);
  };

  // Retry on error
  const retryLastMessage = () => {
    if (lastUserMessage) {
      setMessages(prev => prev.filter(m => m.role !== "error"));
      handleSend(lastUserMessage);
    }
  };

  // MAIN SEND HANDLER
  const handleSend = async userText => {
    if (!userText.trim()) return;

    setLastUserMessage(userText);

    appendMessage({
      role: "user",
      content: userText,
      timestamp: timeFormat.format(Date.now()),
    });

    const aiMessageId = "ai-" + Date.now();

    // Insert THINKING bubble first
    appendMessage({ id: aiMessageId, role: "thinking" });

    setIsGenerating(true);

    try {
      // Backend call
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token || ""}`,
          },
          body: JSON.stringify({ prompt: userText }),
        }
      );

      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        const msg =
          data.user_friendly ||
          data.detail ||
          data.message ||
          `Server error: ${res.status}`;

        setMessages(prev =>
          prev.map(m =>
            m.id === aiMessageId
              ? {
                  ...m,
                  role: "error",
                  content: msg,
                  timestamp: timeFormat.format(Date.now()),
                }
              : m
          )
        );

        setIsGenerating(false);
        return;
      }

      const data = await res.json();
      let aiText = data.output || data.response || "";

      if (typeof aiText !== "string") {
        aiText = String(aiText);
      }

      // Replace THINKING → AI before typing starts
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMessageId ? { ...m, role: "ai", content: "" } : m
        )
      );

      // Typing effect
      let i = 0;
      const speed = 5;

      typingIntervalRef.current = setInterval(() => {
        i++;

        setMessages(prev =>
          prev.map(m =>
            m.id === aiMessageId
              ? {
                  ...m,
                  content: aiText.slice(0, i),
                  timestamp: timeFormat.format(Date.now()),
                }
              : m
          )
        );

        maintainBottom();

        if (i >= aiText.length) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          setIsGenerating(false);
        }
      }, speed);
    } catch (error) {
      console.error("Network error:", error);
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMessageId
            ? {
                ...m,
                role: "error",
                content:
                  "Network error. Please check your internet connection.",
                timestamp: timeFormat.format(Date.now()),
              }
            : m
        )
      );
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    maintainBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />

      <div className="chat-container w-full h-screen flex flex-col bg-gray-100 shadow-lg pt-24">
        {/* CHAT BOX */}
        <div
          ref={containerRef}
          id="chat-box"
          className="px-5 pb-20 flex flex-col gap-4 scroll-smooth overflow-y-auto h-full relative"
        >
          {messages.length === 0 && (
            <p className="text-center p-20 font-semibold lg:text-4xl sm:text-3xl text-2xl">
              What's the Query for today?
            </p>
          )}

          {messages.map(m =>
            m.role === "thinking" ? (
              <AiThinking key={m.id} />
            ) : (
              <ChatMessage key={m.id} message={m} />
            )
          )}

          <span
            id="bottom-box"
            className="fixed bottom-0 w-full size-4 bg-gray-100 text-center"
          ></span>
        </div>

        {/* Scroll to bottom */}
        <button
          onClick={scrollToBottom}
          className={`absolute bottom-20 left-[50%] bg-zinc-100 text-sky-600 border border-sky-600 p-1.5 rounded-full shadow-lg transition-all hover:cursor-pointer ${
            showButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <PiArrowDownBold />
        </button>

        {/* INPUT */}
        <ChatInput
          onSend={handleSend}
          onStop={stopGeneration}
          isGenerating={isGenerating}
          onRetry={retryLastMessage}
        />
      </div>
    </div>
  );
}
