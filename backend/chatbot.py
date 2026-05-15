def get_response(user_message):
    user_message = user_message.lower()

    if user_message in ["hi", "hello"]:
        return "Hello! How can I help you?"
    elif "help" in user_message:
        return "Sure, tell me what you need help with."
    elif "bye" in user_message:
        return "Goodbye! Have a great day."
    else:
        return "Sorry, I didn’t understand that."
