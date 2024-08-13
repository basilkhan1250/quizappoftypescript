import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from "./services/quiz_service.ts"
import { QuestionType } from './Types/Quiz_types.ts'
import QuestionCard from './component/QuestionCard.tsx';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)
  let [quizstart, setQuizStart] = useState(false)
  let [quantity, setQuantity] = useState<number | undefined>()
  let [level, setLevel] = useState<string>("")

  const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quantity && level) {
      const questions: QuestionType[] = await getQuizDetails(quantity, level);
      setQuiz(questions);
      setQuizStart(true); // Start the quiz after fetching the questions
    } else {
      alert("Please enter both the quantity and difficulty level.");
    }
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[currentStep];
    console.log("Correct answer " + currentQuestion.correct_answer + " user selection " + userAns);
    if (userAns === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(currentStep + 1);
    else {
      setShowResult(true);
    }
  }

  if (!quizstart) {

    return (


      <div className="container">
        <div className="blur">
          <h1 className='textcolor'>Welcome To The Quiz</h1>
          <hr className="line"></hr>
          <form onSubmit={handleInput}>
            <label htmlFor='quantity' className='textcolor'>Enter the Quantity Of Questions:</label>
            <input
              type='number'
              id='quantity'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <br />
            <label htmlFor='level' className='textcolor'>Enter Difficulty Level Of Questions:</label>
            <select
              id='level'
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className='custom-select'
            >
              <option value="">Select Difficulty Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <br />
            <button className="cssbuttons-io-button">
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>

            {/* <button className="button" type="submit">Start The Quiz</button> */}
          </form>
        </div>
      </div>
    )
  }

  if (!quiz.length)
    return <h2 className='container'>loading.....</h2>

  if (showResult) {
    return (
      <div className='container blur'>
        <h3>Result</h3>
        <p>Your Final Score is: {score} Out Of: {quiz.length}</p>
      </div>
    )
  }

  return (
    <div className='container blur'>
      <QuestionCard
        option={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;