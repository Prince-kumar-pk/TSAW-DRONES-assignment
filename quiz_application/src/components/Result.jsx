import React from 'react';

const Result = ({ score, onRestartQuiz }) => {
  return (
    <div className="container mx-auto mt-8 p-4 bg-gradient-to-r from-blue-400 to-purple-500 shadow-md max-w-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Quiz Result</h2>
      <p className="mb-4 text-white">Your score: {score}</p>
      {score >= score * 0.4 ? (
        <p className="text-green-500 font-bold mb-4 text-white">Congratulations! You passed the quiz!</p>
      ) : (
        <p className="text-red-500 font-bold mb-4 text-white">Sorry, you did not pass the quiz.</p>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onClick={onRestartQuiz}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
