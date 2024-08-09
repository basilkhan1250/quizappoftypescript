import React from "react";
import { questionPropType } from "../Types/Quiz_types";

const QuestionCard: React.FC<questionPropType> = ({ question, option, callback }) => {
    console.log(question, option)
    return (
        <div>
            <div className="question">
                {question}
            </div>
            <form onSubmit={callback}>
                {
                    option.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <label>
                                    <input type="radio" name="opt" value={opt} />{opt}
                                </label>
                            </div>
                        )
                    })
                }
                <input type="submit" />
            </form>
        </div>
    )
}

export default QuestionCard