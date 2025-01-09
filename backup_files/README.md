# Chatbot Application

This is a real-time chatbot application that supports multiple concurrent conversations with user-specific bots stored in Firebase.

## Features

- User-specific chatbots stored in Firebase
- Real-time WebSocket communication
- Multiple concurrent conversations
- Embeddable chat widget
- Conversation history persistence
- Secure user authentication

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a Firebase project and download the service account key:
   - Go to Firebase Console
   - Create a new project
   - Go to Project Settings > Service Accounts
   - Generate a new private key
   - Save it as `serviceAccountKey.json` in the project root

3. Create a `.env` file with your configuration:
```
FIREBASE_PROJECT_ID=your-project-id
```

4. Run the application:
```bash
python main.py
```

## Using the Chat Widget

To embed the chat widget in your website:

1. Include the widget script:
```html
<script src="/static/widget.js"></script>
```

2. Create a container for the widget:
```html
<div id="chat-container"></div>
```

3. Initialize the widget:
```javascript
const chatWidget = createChatWidget('user-id', 'bot-id', 'chat-container');
```

## API Endpoints

- `POST /api/bots` - Create a new bot
- `GET /api/bots/{user_id}` - Get all bots for a user
- `GET /api/conversations/{user_id}/{bot_id}` - Get conversation history
- `WebSocket /ws/{user_id}/{bot_id}` - Real-time chat connection
