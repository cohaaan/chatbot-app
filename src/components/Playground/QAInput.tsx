import React, { useState } from 'react';

interface QAPair {
  question: string;
  answer: string;
}

export default function QAInput() {
  const [qaPairs, setQaPairs] = useState<QAPair[]>([{ question: '', answer: '' }]);

  const handleQuestionChange = (index: number, value: string) => {
    const newPairs = [...qaPairs];
    newPairs[index].question = value;
    setQaPairs(newPairs);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newPairs = [...qaPairs];
    newPairs[index].answer = value;
    setQaPairs(newPairs);
  };

  const addPair = () => {
    setQaPairs([...qaPairs, { question: '', answer: '' }]);
  };

  const removePair = (index: number) => {
    if (qaPairs.length > 1) {
      const newPairs = qaPairs.filter((_, i) => i !== index);
      setQaPairs(newPairs);
    }
  };

  const handleSubmit = async () => {
    // Mock implementation for now
    console.log('Q/A pairs to process:', qaPairs);
  };

  return (
    <div className="space-y-4">
      {qaPairs.map((pair, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={pair.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter question..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Answer {index + 1}
            </label>
            <textarea
              value={pair.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows={2}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter answer..."
            />
          </div>
          {qaPairs.length > 1 && (
            <button
              onClick={() => removePair(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addPair}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Q/A Pair
      </button>
      <button
        onClick={handleSubmit}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Re-Train Chatbot
      </button>
    </div>
  );
}
