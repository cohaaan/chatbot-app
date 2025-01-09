import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddChatbotCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chatbot-manager');
  };

  return (
    <button 
      onClick={handleClick}
      className="flex h-[300px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-blue-600 p-6 text-white transition-transform hover:scale-105"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
        <Plus size={32} className="text-white" />
      </div>
      <span className="text-xl font-semibold">Add chatbot</span>
    </button>
  );
}