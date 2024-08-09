import { Quiz, QuestionType } from '../Types/Quiz_types'


const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)



export async function getQuizDetails(total: number, level: string): Promise<QuestionType[]> {
    const res = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${level}&type=multiple`)
    let { results } = await res.json()
    const quiz: QuestionType[] = results.map((questionObj: Quiz, index: number) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quiz
}

