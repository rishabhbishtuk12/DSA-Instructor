import React from "react";

export default function AiThinking() {
  return (
    <div className="self-start max-w-[80%]">
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
