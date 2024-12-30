import React from 'react';
import SearchBar from '../components/Dashboard/SearchBar';
import AddChatbotCard from '../components/Dashboard/AddChatbotCard';
import GetStartedSection from '../components/Dashboard/GetStartedSection';

export default function Overview() {
  return (
    <>
      <div className="mb-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Chatbots</h1>
          <button className="rounded-lg bg-white px-6 py-2 font-medium text-blue-600 shadow-sm hover:bg-gray-50">
            Subscribe now
          </button>
        </div>
        <SearchBar />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AddChatbotCard />
      </div>

      <GetStartedSection />
    </>
  );
}