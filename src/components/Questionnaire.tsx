import { useEffect, useState } from "react";
import { QnA, shuffle } from "../App";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";

type QProps = {
    showForm: boolean;
    showQuestions: boolean;
    onStart: (name: string, email: string) => void;
    onNext: () => void;
    onBack: () => void;
    finishQuestion: () => void;
    onAnswered: (ans_id: number) => void;
    currentQuestion: number,
    totalQuestions: number,
    order: shuffle[]
}

const Questionnaire: React.FC<QProps> = ({ showForm, showQuestions, onStart, onNext, onBack, onAnswered, finishQuestion, currentQuestion, totalQuestions, order }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStart(name, email);
    }

    const { handleAnswer, translation } = useLanguage();
    

    const qnA = translation.questions[order.map(o => (o.value))[currentQuestion]];
    return (
        <div className="mt-6 p-9 flex flex-col justify-between bg-white w-[80%] md:min-w-[600px] rounded-b-2xl border border-gray-400">
            {showForm && (
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center md:min-w-[600px] min-h-28">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-400 p-2 mb-4 w-80 h-14"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-400 p-2 mb-4 w-80 h-14"
                            required
                        />
                        <button type="submit" className="bg-white text-black py-4 px-16 border border-gray-400 hover:bg-black hover:text-white transition-all">
                            {translation.btn3}
                        </button>
                    </form>
                </div>
            )}
            {showQuestions && (
                <>
                    <div className="p-2 mb-6 bg-gray-100 rounded-lg">
                        {qnA.question}
                    </div>
                    <div className="flex flex-col gap-2">
                        {qnA.choice.map((c, idx) => {
                            const isSelected = qnA.userAnswer === idx; // Whether the user has selected this option.
                            let backgroundColor = "bg-gray-100";

                            if (qnA.userAnswer !== undefined) { // If user has answered
                                backgroundColor = isSelected ? (qnA.answer === idx ? "bg-green-400- text-green-500" : "bg-red-400- text-red-500") : "bg-gray-100" // Grayed out for non-selected options if answered
                            }

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleAnswer(currentQuestion, idx)}
                                    className={`bg-gray-100 p-2 rounded-lg hover:cursor-pointer border border-gray-100 ${!isSelected && `hover:bg-white hover:border-gray-100`} transition-all ${backgroundColor}`}
                                >
                                    {String.fromCharCode(65 + idx)}. {c}
                                    {isSelected && qnA.userAnswer !== undefined && qnA.explanation && ( // Show explanation if available
                                        <div className="mt-2">
                                            <div className="w-full h-1 bg-white"></div>
                                            {qnA.answer === idx ? (
                                                <span className="flex items-center text-green-500">
                                                    <FaCheckCircle className="mr-2 text-4xl" /> {qnA.explanation.correct}
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-red-500">
                                                    <FaTimesCircle className="mr-2 text-4xl" />{qnA.explanation.wrong}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-around w-full mt-4">
                        <button onClick={onBack} className="py-4 px-16 bg-white text-black border border-gray-400 hover:bg-black hover:text-white transition-all">
                            {translation.btn1}
                        </button>
                        <button
                            className="py-4 px-16 bg-white text-black border border-gray-400 hover:bg-black hover:text-white transition-all"
                            onClick={currentQuestion === (totalQuestions - 1) ? finishQuestion : onNext}
                        >
                            {currentQuestion === (totalQuestions - 1) ? translation.btn4 : translation.btn2}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Questionnaire;