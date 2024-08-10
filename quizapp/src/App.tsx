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
      <div>
        <h2>Welcome To The Quiz</h2>
        <form onSubmit={handleInput}>
          <label htmlFor='quantity'>Enter the Quantity Of Questions:</label>
          <input 
            type='number' 
            id='quantity' 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
          /><br />
          
          <label htmlFor='level'>Enter Difficulty Level Of Questions:</label>
          <input 
            type='text' 
            id='level' 
            value={level} 
            onChange={(e) => setLevel(e.target.value)} 
          /><br />

          <button type="submit">Start The Quiz</button>
        </form>
      </div>
    )
  }

  if (!quiz.length)
    return <h2 className='App'>loading.....</h2>
  
  if (showResult) {
    return (
      <div>
        <h3>Result</h3>
        <p>Your Final Score is: {score} Out Of: {quiz.length}</p>
      </div>
    )
  }

  return (
    <div className='App'>
      <QuestionCard
        option={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
