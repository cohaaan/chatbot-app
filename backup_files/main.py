from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
from typing import Dict, List
import json
import uuid
from datetime import datetime
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_app = initialize_app(cred)
db = firestore.client()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Bot(BaseModel):
    name: str
    description: str
    user_id: str

class Message(BaseModel):
    content: str
    sender: str
    timestamp: str

# Store active websocket connections
connections: Dict[str, Dict[str, WebSocket]] = {}

@app.post("/api/bots")
async def create_bot(bot: Bot):
    try:
        bot_id = str(uuid.uuid4())
        bot_data = bot.dict()
        bot_data["created_at"] = datetime.utcnow().isoformat()
        bot_data["id"] = bot_id
        
        # Store bot in Firebase under user's collection
        db.collection("users").document(bot.user_id).collection("bots").document(bot_id).set(bot_data)
        
        return {"id": bot_id, **bot_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bots/{user_id}")
async def get_user_bots(user_id: str):
    try:
        bots_ref = db.collection("users").document(user_id).collection("bots").stream()
        bots = [{"id": bot.id, **bot.to_dict()} for bot in bots_ref]
        return bots
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/{user_id}/{bot_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str, bot_id: str):
    await websocket.accept()
    
    if user_id not in connections:
        connections[user_id] = {}
    connections[user_id][bot_id] = websocket
    
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Store message in Firebase
            message = {
                "content": message_data["content"],
                "sender": "user",
                "timestamp": datetime.utcnow().isoformat(),
            }
            
            db.collection("users").document(user_id)\
              .collection("bots").document(bot_id)\
              .collection("messages").add(message)
            
            # Here you would implement your chatbot logic
            # For now, we'll just echo the message
            bot_response = {
                "content": f"Echo: {message_data['content']}",
                "sender": "bot",
                "timestamp": datetime.utcnow().isoformat(),
            }
            
            # Store bot response
            db.collection("users").document(user_id)\
              .collection("bots").document(bot_id)\
              .collection("messages").add(bot_response)
            
            # Send response back to client
            await websocket.send_text(json.dumps(bot_response))
            
    except WebSocketDisconnect:
        if user_id in connections and bot_id in connections[user_id]:
            del connections[user_id][bot_id]
            if not connections[user_id]:
                del connections[user_id]

@app.get("/api/conversations/{user_id}/{bot_id}")
async def get_conversation_history(user_id: str, bot_id: str):
    try:
        messages_ref = db.collection("users").document(user_id)\
                        .collection("bots").document(bot_id)\
                        .collection("messages")\
                        .order_by("timestamp").stream()
        
        messages = [{"id": msg.id, **msg.to_dict()} for msg in messages_ref]
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
