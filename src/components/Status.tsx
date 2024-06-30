import { FaRedo } from "react-icons/fa";

type StatusProps = {
    currentQuestion: number;
    totalQuestions: number;
    onRestart: () => void;
    showForm: boolean;
}

const Status: React.FC<StatusProps> = ({
    currentQuestion,
    totalQuestions,
    onRestart,
    showForm,
}) => {
    const progress = (((currentQuestion + 1) ?? 0) / (totalQuestions ?? 1)) * 100;

    return (
        <div className="mt-10 p-6 bg-white w-[80%] md:min-w-[600px] flex flex-col items-center justify-between rounded-t-2xl border border-gray-400">
            {showForm ? <h1 className="text-gray-700 text-2xl text-center">
                Test Your Awareness About Common Phishing Tactics.
            </h1> :
                <>
                    <div className={progress === 0 ? `w-full flex justify-center items-center py-2` : `w-full flex justify-between items-center mb-4`}>
                        <div className='text-black text-xl font-[Halant]'>
                            {currentQuestion + 1} / {totalQuestions}
                        </div>
                        <button onClick={onRestart} className='text-black text-lg font-extralight hover:bg-gray-100 p-2 rounded-full transition-all'>
                            <FaRedo />
                        </button>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div className="bg-green-300 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </>}
        </div>
    )
}

export default Status;