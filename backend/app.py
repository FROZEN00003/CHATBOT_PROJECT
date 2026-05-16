from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from chatbot import get_response

import sqlite3


app = Flask(__name__)

CORS(app)


# Create database
def init_db():

    conn = sqlite3.connect("chat_history.db")

    cursor = conn.cursor()

    cursor.execute("""

        CREATE TABLE IF NOT EXISTS chats (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT,
            message TEXT

        )

    """)

    conn.commit()

    conn.close()


init_db()


# Homepage
@app.route("/")
def home():

    return render_template("index.html")


# Save message
def save_message(sender, message):

    conn = sqlite3.connect("chat_history.db")

    cursor = conn.cursor()

    cursor.execute(

        "INSERT INTO chats (sender, message) VALUES (?, ?)",
        (sender, message)

    )

    conn.commit()

    conn.close()


# Chat API
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message")


    # Save user message
    save_message("User", user_message)


    reply = get_response(user_message)


    # Save bot reply
    save_message("Bot", reply)


    return jsonify({
        "reply": reply
    })


if __name__ == "__main__":

    app.run(debug=True)