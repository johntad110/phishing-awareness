import { useEffect, useState } from "react";
import { QnA } from "../App";

type QProps = {
    QnA: QnA;
    finishQuestion: () => void;
    handleNext: () => void;
}




const Questionnaire: React.FC<QProps> = ({ QnA, finishQuestion, handleNext }) => {

    const [question, setQuestion] = useState(QnA);
    

    return (
        <div className="bg-gray-200 w-[80%] md:min-w-[600px] min-h-96 rounded-es-2xl rounded-ee-2xl mt-6 p-9 flex flex-col justify-center align-middle">
            <div className="bg-transparent w-[70%] md:min-w-[400px] min-h-80 m-auto flex flex-col justify-center items-center">
                
                        <div className="mb-8 text-2xl">
                            {question.question}
                        </div>
                        <div className="gap-4 flex flex-col text-xl">
                            {question.choice.map((c, idx) => (
                                <div key={idx} className="">
                                    {c}
                                </div>
                            ))}
                        </div>
                
            </div>
            <div className="m-auto flex justify-around align-middle space-x-24 w-[60%]">
                <button className="bg-black text-white py-4 px-16 border border-black hover:bg-white hover:text-black transition-all">CLEAR</button>
                <button className="bg-black text-white py-4 px-16 border border-black hover:bg-white hover:text-black transition-all" onClick={handleNext}>NEXT</button>
            </div>
        </div>
    )

}

export default Questionnaire;