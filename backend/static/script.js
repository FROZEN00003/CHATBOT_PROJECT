function sendMessage() {

    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (message === "") return;

    const chatBox = document.getElementById("chat-box");

    // User message
    chatBox.innerHTML += `
        <div class="message user-message">
            ${message}
        </div>
    `;

    fetch("http://127.0.0.1:5000/chat", {
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

        // Bot message
        chatBox.innerHTML += `
            <div class="message bot-message">
                ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;
    });

    input.value = "";
}