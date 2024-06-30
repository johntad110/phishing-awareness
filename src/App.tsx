import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Status from "./components/Status";
import FormInput from "./components/FormInput";
import ResultsDisplay from "./components/ResultsDisplay";
import Questionnaire from "./components/Questionnaire";
import qna from "./data/questions.json";

export interface QnA {
  question: string,
  choice: string[],
  answer: number
}

function App() {
  const [showForm, setShowForm] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const QnAs: QnA[] = qna.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => (a.sort - b.sort))
    .map(({ value }) => ({
      question: value.question,
      choice: value.choice,
      answer: value.answer
    }));

  const handleStart = () => {
    setShowForm(false);
    setShowQuestions(true);
  };

  const handleFinishQuestions = () => {
    setShowQuestions(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowForm(true);
    setShowQuestions(false);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        {showForm && ( <>
          <Status />
          <FormInput onStart={handleStart} />
        </>)}
        {showQuestions && (
          <>
            <Status
              currentQuestion={5}
              totalQuestions={8}
              onRestart={handleRestart}
            />
            {<Questionnaire QnAs={QnAs} finishQuestion={handleFinishQuestions}/>}
          </>
        )}
        {showResults && <ResultsDisplay />}
      </div>
    </div>
  );
}

export default App;
