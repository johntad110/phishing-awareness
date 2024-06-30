import { useState } from "react";
import { QnA } from "../App";

type QProps = {
    qnAs: QnA;
    showForm: boolean;
    showQuestions: boolean;
    onStart: () => void;
    onNext: () => void;
    onBack: () => void;
    finishQuestion: () => void;
}

const Questionnaire: React.FC<QProps> = ({ qnAs, showForm, showQuestions, onStart, onNext, onBack, finishQuestion }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStart();
    }

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
                            Start Quiz
                        </button>
                    </form>
                </div>
            )}
            {showQuestions && (
                <>
                    <div className="p-2 mb-6 bg-gray-100 rounded-lg">
                        {qnAs.question}
                    </div>
                    <div className="flex flex-col gap-2">
                        {qnAs.choice.map((c, idx) => (
                            <div className="bg-gray-100 p-2 rounded-lg hover:cursor-pointer border border-gray-100 hover:bg-white hover:border-gray-100 transition-all" key={idx}>{c}</div>
                        ))}
                    </div>
                    <div className="flex justify-around w-full mt-4">
                        <button onClick={onBack} className="py-4 px-16 bg-white text-black border border-gray-400 hover:bg-black hover:text-white transition-all">
                            BACK
                        </button>
                        <button
                            className="py-4 px-16 bg-white text-black border border-gray-400 hover:bg-black hover:text-white transition-all"
                            onClick={onNext}
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Questionnaire;