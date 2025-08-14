
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
        messageDiv.classList.add("message", "rounded-full", "p-2.5", "max-w-[80%]", "break-words");
        if (className === "ai-message") {
            messageDiv.classList.add("self-start", "ai-message");
            const htmlContent = marked.parse(text); // Convert markdown to HTML
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

        // Create AI message container immediately
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("self-start", "ai-message");
        chatBox.appendChild(messageDiv);

        // Smooth typewriter effect with auto-scroll
        let index = 0;
        const typingInterval = setInterval(() => {
            // Add one character at a time
            messageDiv.innerHTML = marked.parse(aiText.slice(0, index));

            // Highlight code if any appears
            messageDiv.querySelectorAll("pre code").forEach((block) => {
                hljs.highlightElement(block);
            });

            // Smooth scroll to bottom
            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: "smooth"
            });

            index++;
            if (index > aiText.length) {
                clearInterval(typingInterval);
            }
        }, 5); // typing speed (ms per character)

    } catch (error) {
        console.error("Error:", error);
        appendMessage("Sorry, something went wrong. Please try again.", "ai-message");
    }
}
});