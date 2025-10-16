document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const scrollBtn = document.getElementById("scroll-btn");
  const sendBtn = document.getElementById("send-btn");
  const stopBtn = document.getElementById("stop");

  let autoScrollEnabled = true;
  let typingInterval = null;
  let isGenerating = false;
  let lastUserMessage = "";

  // ----- Scroll control -----
  function showScrollButton() {
    scrollBtn.classList.remove("pointer-events-none", "opacity-0");
  }
  function hideScrollButton() {
    scrollBtn.classList.add("pointer-events-none", "opacity-0");
  }

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

  chatBox.addEventListener("scroll", () => {
    if (chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 5) {
      autoScrollEnabled = true;
      hideScrollButton();
    } else {
      showScrollButton();
    }
  });

  scrollBtn.addEventListener("click", () => {
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    autoScrollEnabled = true;
    hideScrollButton();
  });

  // ----- Toggle buttons -----
  function toggleButtons(isGeneratingNow) {
    isGenerating = isGeneratingNow;
    sendBtn.style.display = isGenerating ? "none" : "block";
    stopBtn.style.display = isGenerating ? "block" : "none";
  }

  // ----- Append messages -----
  function appendMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "p-2.5", "max-w-[80%]", "break-words");

    if (className === "ai-message") {
      messageDiv.classList.add("self-start", "ai-message");
      const htmlContent = marked.parse(text);
      messageDiv.innerHTML = htmlContent;
      if (window.hljs) {
        messageDiv.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      }
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
    if (autoScrollEnabled) chatBox.scrollTop = chatBox.scrollHeight;
  }

  // ----- Error handling -----
  function getErrorMessage(errorData) {
    return (
      errorData.user_friendly ||
      errorData.message ||
      "An unexpected error occurred. Please try again."
    );
  }

  function showErrorWithRetry(errorMessage, errorType) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("self-start", "ai-message", "error-message");
    messageDiv.style.borderLeft = "4px solid #ef4444";
    messageDiv.style.backgroundColor = "#fef2f2";
    messageDiv.style.padding = "12px";
    messageDiv.style.borderRadius = "8px";

    let retryButton = "";
    if (
      errorType === "network_error" ||
      errorType === "timeout_error" ||
      errorType === "service_unavailable"
    ) {
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
    if (autoScrollEnabled) chatBox.scrollTop = chatBox.scrollHeight;
  }

  // ----- Fetch AI response -----
  async function getAIResponse(userText) {
    toggleButtons(true);
    lastUserMessage = userText;

    try {
      const response = await fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMessage = getErrorMessage(data);
        showErrorWithRetry(errorMessage, data.error);
        toggleButtons(false);
        return;
      }

      const aiText = data.response;
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("self-start", "ai-message");
      chatBox.appendChild(messageDiv);

      let index = 0;
      typingInterval = setInterval(() => {
        messageDiv.innerHTML = marked.parse(aiText.slice(0, index));

        if (window.hljs) {
          messageDiv.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
          });
        }

        if (autoScrollEnabled) chatBox.scrollTop = chatBox.scrollHeight;

        index++;
        if (index > aiText.length) {
          clearInterval(typingInterval);
          typingInterval = null;

          // 🟩 Final highlight after render
          if (window.hljs) hljs.highlightAll();

          toggleButtons(false);
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

  // ----- Retry last failed request -----
  window.retryLastMessage = function () {
    if (lastUserMessage) {
      document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
      getAIResponse(lastUserMessage);
    }
  };

  // ----- Send Message -----
  function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;
    appendMessage(userText, "user-message");
    userInput.value = "";
    getAIResponse(userText);
  }

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !isGenerating) sendMessage();
  });

  // ----- Stop Button -----
  stopBtn.addEventListener("click", () => {
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
      toggleButtons(false);
    }
  });

  toggleButtons(false); // Initialize state
});
