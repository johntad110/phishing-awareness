const ResultsDisplay: React.FC<{
  name: string;
  score: number;
  totalQuestions: number;
  goBack: () => void;
  restart: () => void;
}> = ({
  name,
  score,
  totalQuestions,
  goBack,
  restart,
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const message = calculateMessage(percentage);

    return (
      <div className="mt-6 p-9 flex flex-col justify-between bg-white w-[80%] md:min-w-[600px] rounded-b-2xl border border-gray-400">
        <h2 className="text-2xl mb-4">👋Heyyy, {name}!</h2>
        <p className="text-xl mb-4">You answered {score} out of {totalQuestions}. ({percentage}%)</p>
        <p className={`text-lg font-bold ${message.color}`}>{message.text}</p>
        <p className="text-base mt-4">{message.recommendation}</p>
        <div className="flex justify-between">
          <div className="bg-black w-fit text-white py-2 px-4 mt-2 border border-black hover:bg-white hover:text-black hover:cursor-pointer transition-all" onClick={goBack}>Go Back</div>
          <div className="bg-black w-fit text-white py-2 px-4 mt-2 border border-black hover:bg-white hover:text-black hover:cursor-pointer transition-all" onClick={restart}>Try Again</div>
        </div>
      </div>
    );
  };

const calculateMessage = (percentage: number) => {
  let message = { color: "", text: "", recommendation: "" };
  if (percentage >= 80) {
    message = {
      color: "text-green-500",
      text: "🎉Excellent!🎉",
      recommendation: "You have a strong understanding of the material. Keep up the good work!",
    };
  } else if (percentage >= 60) {
    message = {
      color: "text-orange-500",
      text: "Good Job!",
      recommendation: "You're on the right track. Consider reviewing areas where you missed questions to solidify your knowledge.",
    };
  } else {
    message = {
      color: "text-red-500",
      text: "Needs Improvement😢",
      recommendation: "Don't be discouraged! 💪Take some time to review the explanations and try again.",
    };
  }
  return message;
};

export default ResultsDisplay;