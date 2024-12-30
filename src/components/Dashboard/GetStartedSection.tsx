import React from 'react';
import { Play, FileText, HelpCircle } from 'lucide-react';

const cards = [
  {
    icon: <Play className="h-8 w-8 text-yellow-500" />,
    title: 'How to start building your chatbots',
    action: 'Watch',
  },
  {
    icon: <FileText className="h-8 w-8 text-green-500" />,
    title: 'Learn the basics of ChatBot within minutes',
    action: 'Start lesson',
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-blue-500" />,
    title: 'Help Center',
    description: 'Visit our Help Center to learn more about ChatBot setup.',
    action: 'Explore',
  },
];

export default function GetStartedSection() {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Get started</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
            {card.icon}
            <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
            {card.description && <p className="mt-2 text-gray-600">{card.description}</p>}
            <button className="mt-4 rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-800 hover:bg-gray-200">
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}