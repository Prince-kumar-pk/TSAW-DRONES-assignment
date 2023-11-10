import React, { useState } from 'react';
import './App.css';
import QuizPage from './components/QuizPage';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(false);

  const handleOnClick = () => {
    setShowQuizPage(true);
  };

  return (
    <div className="App bg-gradient-to-r from-green-400 to-blue-500 w-screen h-screen ">
      <h1 className="text-4xl text-white mb-8">Take A Test</h1>

      {!showQuizPage && (
        <button
          onClick={handleOnClick}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Start..
        </button>
      )}

      {showQuizPage && <QuizPage />}
    </div>
  );
}

export default App;
