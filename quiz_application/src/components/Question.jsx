import React from 'react';

const Question = ({ question, onSelectAnswer }) => {
  if (!question) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <ul className="list-none pl-5">
        {question.options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.id}
                value={option}
                onChange={() => onSelectAnswer(question.id, option)}
                className="mr-2 text-blue-500 focus:ring-2 focus:ring-blue-500 p-8"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
