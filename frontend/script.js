function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;

    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += "<p><b>You:</b> " + message + "</p>";
        chatBox.innerHTML += "<p><b>Bot:</b> " + data.reply + "</p>";
    });

    input.value = "";
}
