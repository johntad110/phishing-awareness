import { FaRedo } from "react-icons/fa";

type StatusProps = {
    currentQuestion: number;
    totalQuestions: number;
    onRestart: () => void;
}

const Status: React.FC<StatusProps> = ({
    currentQuestion,
    totalQuestions,
    onRestart
}) => {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="bg-gray-800 w-[80%] md:min-w-[600px] min-h-28 rounded-ss-2xl rounded-se-2xl mt-24 p-6 flex flex-col items-center justify-between">
            <div className='w-full flex justify-between items-center mb-4'>
                <div className='text-white text-xl font-[Halant]'>
                    {currentQuestion} / {totalQuestions}
                </div>
                <button onClick={onRestart} className='text-white text-lg hover:bg-gray-700 p-2 rounded-full transition-all'>
                    <FaRedo />
                </button>
            </div>

            <div className="w-full bg-gray-700 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default Status;