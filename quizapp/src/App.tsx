import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from "./services/quiz_service.ts"
import { QuestionType } from './Types/Quiz_types.ts'
import QuestionCard from './component/QuestionCard.tsx';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, "easy")
      // console.log(questions)
      setQuiz(questions)
    }
    fetchData()
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault()
    // console.log(userAns)

    const currentQuestion: QuestionType = quiz[currentStep]
    console.log("Correct answer " + currentQuestion.correct_answer + " user selection " + userAns)
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score)
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep)
    else {
      alert("Your Final Score is: " + score + " " + " Out Of: " + quiz.length)
      setCurrentStep(0)
      setScore(0)
    }
  }

  if (!quiz.length)
    return <h2 className='App'>loading.....</h2>

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
