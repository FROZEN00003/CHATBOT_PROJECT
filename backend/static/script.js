const input = document.getElementById("user-input");


// Enter key support
input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Get current time
function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

}


// Clear chat
function clearChat() {

    document.getElementById("chat-box").innerHTML = "";

}


function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    const chatBox = document.getElementById("chat-box");

    const time = getCurrentTime();


    // User message
    chatBox.innerHTML += `
        <div class="message user-message">

            ${message}

            <div class="timestamp">
                ${time}
            </div>

        </div>
    `;


    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";


    // Typing indicator
    const typingDiv = document.createElement("div");

    typingDiv.className = "message bot-message";

    typingDiv.id = "typing-indicator";

    typingDiv.innerText = "Bot is typing...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;


    fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    })

    .then(response => response.json())

    .then(data => {

        document.getElementById("typing-indicator").remove();

        const botTime = getCurrentTime();


        // Bot message
        chatBox.innerHTML += `
            <div class="message bot-message">

                ${data.reply}

                <div class="timestamp">
                    ${botTime}
                </div>

            </div>
        `;


        chatBox.scrollTop = chatBox.scrollHeight;

    })

    .catch(error => {

        console.error("Error:", error);

    });

}