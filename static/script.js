document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const scrollBtn = document.getElementById("scroll-btn");
  const sendBtn = document.getElementById("send-btn");
  const stopBtn = document.getElementById("stop");

  let autoScrollEnabled = true;
  let typingInterval = null;
  let isGenerating = false;

  function showScrollButton() {
    scrollBtn.classList.remove("pointer-events-none", "opacity-0");
  }

  function hideScrollButton() {
    scrollBtn.classList.add("pointer-events-none", "opacity-0");
  }

  // Stop auto-scroll on any user scroll/touch
  ["wheel", "mousedown", "touchstart"].forEach((evt) => {
    chatBox.addEventListener(
      evt,
      () => {
        autoScrollEnabled = false;
        showScrollButton();
      },
      { passive: true }
    );
  });

  // Auto-scroll detect
  chatBox.addEventListener("scroll", () => {
    if (chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 5) {
      autoScrollEnabled = true;
      hideScrollButton();
    } else {
      showScrollButton();
    }
  });

  // Scroll button click
  scrollBtn.addEventListener("click", () => {
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    autoScrollEnabled = true;
    hideScrollButton();
  });

  function toggleButtons(isGeneratingNow) {
    isGenerating = isGeneratingNow;
    sendBtn.style.display = isGenerating ? "none" : "block";
    stopBtn.style.display = isGenerating ? "block" : "none";
  }

  function appendMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "p-2.5", "max-w-[80%]", "break-words");

    if (className === "ai-message") {
      messageDiv.classList.add("self-start", "ai-message");
      const htmlContent = marked.parse(text);
      messageDiv.innerHTML = htmlContent;
      messageDiv.querySelectorAll("pre code").forEach(hljs.highlightElement);
    } else {
      messageDiv.classList.add(
        "bg-blue-600",
        "self-end",
        "shadow-xl",
        "rounded-full"
      );
      messageDiv.innerHTML = `<p class="text-white px-3">${text}</p>`;
    }
    chatBox.appendChild(messageDiv);
  }

  function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    appendMessage(userText, "user-message");
    userInput.value = "";
    getAIResponse(userText);
  }

  function getErrorMessage(errorData) {
    // Return user-friendly message if available, otherwise fallback to generic message
    return errorData.user_friendly || errorData.message || "An unexpected error occurred. Please try again.";
  }

  function showErrorWithRetry(errorMessage, errorType) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("self-start", "ai-message", "error-message");
    messageDiv.style.borderLeft = "4px solid #ef4444";
    messageDiv.style.backgroundColor = "#fef2f2";
    messageDiv.style.padding = "12px";
    messageDiv.style.borderRadius = "8px";
    
    let retryButton = "";
    if (errorType === "network_error" || errorType === "timeout_error" || errorType === "service_unavailable") {
      retryButton = `<button onclick="retryLastMessage()" class="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Retry</button>`;
    }
    
    messageDiv.innerHTML = `
      <div class="flex items-start">
        <i class="ri-error-warning-line text-red-500 mr-2 mt-1"></i>
        <div>
          <p class="text-red-800 font-medium">${errorMessage}</p>
          ${retryButton}
        </div>
      </div>
    `;
    
    chatBox.appendChild(messageDiv);
    
    if (autoScrollEnabled) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  let lastUserMessage = "";

  async function getAIResponse(userText) {
    toggleButtons(true); // show stop button
    lastUserMessage = userText; // Store for retry functionality

    try {
      const response = await fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      // Check if response contains an error
      if (!response.ok || data.error) {
        const errorMessage = getErrorMessage(data);
        showErrorWithRetry(errorMessage, data.error);
        toggleButtons(false);
        return;
      }

      // Success case - display AI response
      const aiText = data.response;
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("self-start", "ai-message");
      chatBox.appendChild(messageDiv);

      let index = 0;
      typingInterval = setInterval(() => {
        messageDiv.innerHTML = marked.parse(aiText.slice(0, index));
        messageDiv.querySelectorAll("pre code").forEach(hljs.highlightElement);

        if (autoScrollEnabled) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }

        index++;
        if (index > aiText.length) {
          clearInterval(typingInterval);
          typingInterval = null;
          toggleButtons(false); // show send button again
        }
      }, 5);
    } catch (error) {
      console.error("Network error:", error);
      showErrorWithRetry(
        "Network error. Please check your internet connection and try again.",
        "network_error"
      );
      toggleButtons(false);
    }
  }

  // Retry functionality
  window.retryLastMessage = function() {
    if (lastUserMessage) {
      // Remove any existing error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.remove());
      
      // Retry the last message
      getAIResponse(lastUserMessage);
    }
  };

  // Send button click
  sendBtn.addEventListener("click", sendMessage);

  // Stop button click
  stopBtn.addEventListener("click", () => {
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
      toggleButtons(false); // switch back to send
    }
    userInput.removeEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  });


  // Press Enter to send
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" &&!isGenerating) {
      sendMessage();
    }
  });

  toggleButtons(false); // initial state
});
