class ChatWidget {
    constructor(userId, botId, containerId) {
        this.userId = userId;
        this.botId = botId;
        this.container = document.getElementById(containerId);
        this.messages = [];
        this.ws = null;
        this.init();
    }

    init() {
        this.createWidgetHTML();
        this.connectWebSocket();
        this.loadConversationHistory();
    }

    createWidgetHTML() {
        this.container.innerHTML = `
            <div class="chat-widget">
                <div class="chat-header">
                    <h3>Chat Bot</h3>
                </div>
                <div class="chat-messages" id="messages-${this.botId}"></div>
                <div class="chat-input">
                    <input type="text" id="input-${this.botId}" placeholder="Type your message...">
                    <button onclick="sendMessage('${this.botId}')">Send</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .chat-widget {
                width: 300px;
                height: 400px;
                border: 1px solid #ccc;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                background: white;
            }
            .chat-header {
                padding: 10px;
                background: #007bff;
                color: white;
                border-radius: 8px 8px 0 0;
            }
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
            }
            .chat-input {
                padding: 10px;
                display: flex;
                gap: 5px;
            }
            .chat-input input {
                flex: 1;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .chat-input button {
                padding: 5px 10px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .message {
                margin: 5px 0;
                padding: 8px;
                border-radius: 8px;
                max-width: 80%;
            }
            .user-message {
                background: #007bff;
                color: white;
                margin-left: auto;
            }
            .bot-message {
                background: #f1f1f1;
            }
        `;
        document.head.appendChild(style);

        // Add event listener for input
        const input = document.getElementById(`input-${this.botId}`);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    connectWebSocket() {
        this.ws = new WebSocket(`ws://localhost:8000/ws/${this.userId}/${this.botId}`);
        
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.addMessage(message);
        };

        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
            // Attempt to reconnect after a delay
            setTimeout(() => this.connectWebSocket(), 3000);
        };
    }

    async loadConversationHistory() {
        try {
            const response = await fetch(`http://localhost:8000/api/conversations/${this.userId}/${this.botId}`);
            const messages = await response.json();
            messages.forEach(message => this.addMessage(message, false));
        } catch (error) {
            console.error('Error loading conversation history:', error);
        }
    }

    addMessage(message, scroll = true) {
        const messagesDiv = document.getElementById(`messages-${this.botId}`);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message.content;
        messagesDiv.appendChild(messageElement);

        if (scroll) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }

    sendMessage() {
        const input = document.getElementById(`input-${this.botId}`);
        const message = input.value.trim();
        
        if (message && this.ws.readyState === WebSocket.OPEN) {
            const messageData = {
                content: message,
                sender: 'user',
                timestamp: new Date().toISOString()
            };
            
            this.ws.send(JSON.stringify(messageData));
            this.addMessage(messageData);
            input.value = '';
        }
    }
}

// Global function to create a new chat widget
function createChatWidget(userId, botId, containerId) {
    return new ChatWidget(userId, botId, containerId);
}
