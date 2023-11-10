
import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
// import QuestionData from './QuestionData';
import axios from "axios";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(900); 
    const [questioData, setQuestioData] = useState([]);
    const config = {
        headers: {},
      };
    
      const getData = async () => {
        const result = await axios.get(
          "http://localhost:3000/quiz/getAllPosts",
          config
        );
        // console.log(result.data);
        setQuestioData(result.data);
        // console.log("Question data:",questioData);
      };


    useEffect(()=>{
          getData();
    },[])
     

    let total = 30;

    useEffect(() => {
        if (questioData.length > 0) {
          const shuffledQuestions = questioData.sort(() => 0.5 - Math.random()).slice(0, total);
          setQuestions(shuffledQuestions);
        }
      }, [questioData]);
    

    useEffect(() => {

        
        let timerInterval;
        if (timer > 0 && currentQuestion < total - 1 && !showResult) {
            timerInterval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [timer, currentQuestion, showResult]);

    const onSelectAnswer = (questionId, answer) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answer,
        }));
    };

    const onNextQuestion = () => {
        if (currentQuestion < total - 1) {
            setCurrentQuestion(currentQuestion + 1);

        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        let finalScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                finalScore += 3;
            } else {
                finalScore -= 1;
            }
        });

        setScore(finalScore);
        setShowResult(true);
    };

    const onRestartQuiz = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setTimer(900); 
    };

    const renderQuizContent = () => {
        if (showResult) {
            return <Result score={score} onRestartQuiz={onRestartQuiz} />;
        } else if (timer === 0) {
            calculateResult();
            return null;
        } else {
            return (
                <div className="max-w-[80%] mx-auto mt-8 p-4  rounded shadow-lg">
                    <h3 className="text-3xl font-semibold mb-6 text-center">Question {currentQuestion + 1}</h3>
                    <Question question={questions[currentQuestion]} onSelectAnswer={onSelectAnswer} />
                    <div className="mt-6 flex justify-center">
                        {currentQuestion === total - 1 ? (
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                                onClick={calculateResult}
                            >
                                Show Result
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                                onClick={onNextQuestion}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="mb-8">
                <p className="text-xl">
                    Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    <span className="ml-2 text-gray-500">(MM:SS)</span>
                </p>
            </div>
            {renderQuizContent()}
        </div>
    );
};

export default QuizPage;
