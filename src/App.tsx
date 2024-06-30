import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Status from "./components/Status";
import ResultsDisplay from "./components/ResultsDisplay";
import Questionnaire from "./components/Questionnaire";
import qna from "./data/questions.json";

export interface QnA {
  question: string,
  choice: string[],
  answer: number,
  explanation: {
    wrong: string;
    correct: string;
  };
  userAnswer?: number;
}

function App() {
  const [questions, setQuestions] = useState<QnA[]>([])
  const [showForm, setShowForm] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const totalQuestions = questions.length;

  const loadQuestions = () => {
    const QnAs: QnA[] = qna.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => (a.sort - b.sort))
      .map(({ value }) => ({
        question: value.question,
        choice: value.choice,
        answer: value.answer,
        explanation: {
          wrong: value.explanation.wrong,
          correct: value.explanation.correct,
        }
      }));

    setQuestions(QnAs)
  }

  const handleStart = () => {
    setShowForm(false);
    setShowQuestions(true);
  };

  const handleNext = () => {
    if (currentQuestion !== (totalQuestions - 1)) setCurrentQuestion((currQue) => currQue += 1)
  }

  const handlePrevious = () => {
    if (currentQuestion !== 0) setCurrentQuestion((currQue) => currQue -= 1)
  }

  const handleFinishQuestions = () => {
    setShowQuestions(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowForm(true);
    setShowQuestions(false);
    setShowResults(false);
  };

  const handleOnAnswered = (answer_idx: number) => {
     setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestion].userAnswer = answer_idx;
      return updatedQuestions;
     })
  }

  useEffect(() => {
    loadQuestions();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <Status
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          showForm={showForm}
        />
        <Questionnaire
          qnAs={questions[currentQuestion]}
          showForm={showForm}
          showQuestions={showQuestions}
          onStart={handleStart}
          onNext={handleNext}
          onBack={handlePrevious}
          onAnswered={handleOnAnswered}
          finishQuestion={handleFinishQuestions}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />
        {showResults && <ResultsDisplay />}
      </div>
    </div>
  );
}

export default App;
