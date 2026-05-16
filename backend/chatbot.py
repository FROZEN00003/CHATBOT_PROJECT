from google import genai


# Gemini client
client = genai.Client(
    api_key="YOUR_API_KEY"
)


# Local fallback responses
fallback_responses = {

    "hi": "Hello! How can I help you?",

    "hello": "Hi there! Welcome to the chatbot.",

    "how are you": "I'm doing great. How about you?",

    "bye": "Goodbye! Have a great day.",

    "python": "Python is a powerful programming language used in AI, web development, automation, and more.",

    "machine learning": "Machine learning is a branch of AI that enables systems to learn from data."

}


def fallback_chat(user_input):

    user_input = user_input.lower()

    for key in fallback_responses:

        if key in user_input:
            return fallback_responses[key]

    return "AI service is temporarily unavailable. Please try again later."


def get_response(user_input):

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=user_input
        )

        return response.text

    except Exception:

        # Fallback mode
        return fallback_chat(user_input)