import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Chats() {
  return (
    <div className="h-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
      </div>
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <MessageSquare className="mb-4 h-16 w-16 text-gray-400" />
          <p className="text-lg text-gray-600">No chat history available</p>
        </div>
      </div>
    </div>
  );
}