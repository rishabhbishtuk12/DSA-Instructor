document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const scrollBtn = document.getElementById("scroll-btn");
    const stopBtn = document.getElementById("stop-btn");

   let autoScrollEnabled = true;
   let typingInterval = null; // store the interval reference

function showScrollButton() {
    scrollBtn.classList.add("show");
    scrollBtn.classList.remove("hide");
}

function hideScrollButton() {
    scrollBtn.classList.add("hide");
    scrollBtn.classList.remove("show");
}

// Stop auto-scroll on any user interaction
["wheel", "mousedown", "touchstart"].forEach(evt => {
    chatBox.addEventListener(evt, () => {
        autoScrollEnabled = false;
        showScrollButton();
    }, { passive: true });
});

// Re-enable auto-scroll when user is at bottom
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

// send button click - send message
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

// Stop button click - stops generation
    stopBtn.addEventListener("click", () => {
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
});

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText !== "") {
            appendMessage(userText, "user-message");
            userInput.value = "";
            getAIResponse(userText);
        }
    }

    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "rounded-full", "p-2.5", "max-w-[80%]", "break-words");

        if (className === "ai-message") {
            messageDiv.classList.add("self-start", "ai-message");
            const htmlContent = marked.parse(text);
            messageDiv.innerHTML = htmlContent;
            messageDiv.querySelectorAll("pre code").forEach((block) => {
                hljs.highlightElement(block);
            });
        } else {
            messageDiv.classList.add("bg-blue-600", "self-end","shadow-xl");
            messageDiv.innerHTML = `<p class="text-white px-3">${text}</p>`;
        }
        chatBox.appendChild(messageDiv);
}
    async function getAIResponse(userText) {
        try {
            const response = await fetch("/get_response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText })
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
                    if (autoScrollEnabled) {
                        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
                    }
                }
            }, 5);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("Sorry, something went wrong. Please try again.", "ai-message");
        }
    }
});
