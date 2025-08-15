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

  async function getAIResponse(userText) {
    toggleButtons(true); // show stop button

    try {
      const response = await fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
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
      console.error("Error:", error);
      appendMessage(
        "Sorry, something went wrong. Please try again.",
        "ai-message"
      );
      toggleButtons(false);
    }
  }

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
