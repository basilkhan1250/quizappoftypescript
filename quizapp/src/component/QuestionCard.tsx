import React, { useState } from "react";
import { questionPropType } from "../Types/Quiz_types";
import "./QuestionCard.css"


const QuestionCard: React.FC<questionPropType> = ({ question, option, callback }) => {

    let [selectAns, setSelectAns] = useState("")
    const handleSelection = (e: any) => {
        setSelectAns(e.target.value)
    }
    // console.log(question, option)
    return (
        <div className="blur">
            <div className="question">
                <h3 className="textcolor">{question}</h3>
            </div>
            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectAns)}>
                {
                    option.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <label className="textcolor">
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