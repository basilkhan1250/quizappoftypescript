import React, { useState } from "react";
import { questionPropType } from "../Types/Quiz_types";

const QuestionCard: React.FC<questionPropType> = ({ question, option, callback }) => {

    let [selectAns, setSelectAns] = useState("")
    const handleSelection = (e: any) => {
        setSelectAns(e.target.value)
    }

    // console.log(question, option)
    return (
        <div>
            <div className="question">
                {question}
            </div>
            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectAns)}>
                {
                    option.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="opt"
                                        required
                                        value={opt}
                                        checked={selectAns === opt}
                                        onChange={handleSelection}
                                    />{opt}
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