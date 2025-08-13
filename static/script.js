
document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
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
        // Common classes for all messages
        messageDiv.classList.add("message", "rounded-full", "p-2.5", "max-w-[80%]", "break-words");
        if (className === "ai-message") {
            messageDiv.classList.add("self-start");
            messageDiv.innerHTML = `<p class="text-black">${text}</p>`;
        } else {
            messageDiv.classList.add("bg-blue-600", "self-end");
            messageDiv.innerHTML = `<p class="text-white px-3">${text}</p>`;
        }
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function getAIResponse(userText) {
        try {
            const response = await fetch("/get_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userText }),
            });

            const data = await response.json();
            const aiText = data.response;
            appendMessage(aiText, "ai-message");
        } catch (error) {
            console.error("Error:", error);
            appendMessage("Sorry, something went wrong. Please try again.", "ai-message");
        }
    }
});