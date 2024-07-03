import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Status from "./components/Status";
import ResultsDisplay from "./components/ResultsDisplay";
import Questionnaire from "./components/Questionnaire";
import qna from "./data/questions.json";
import {LanguageProvider} from "./components/LanguageContext.tsx";

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
  const [score, setScore] = useState(0);
  const [name, setName] = useState('Name-less')
  const [email, setEmail] = useState('')

  const totalQuestions = questions.length;

  const saveEmail = () => {
    console.log(email)
  }

  const loadQuestions = () => {
    const QnAs: QnA[] = qna[0].map((value) => ({ value, sort: Math.random() }))
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

  const handleStart = (name: string, email: string) => {
    setName(name);
    setEmail(email)
    setShowForm(false);
    setShowQuestions(true);

    saveEmail()
  };

  const handleNext = () => {
    if (currentQuestion !== (totalQuestions - 1)) setCurrentQuestion((currQue) => currQue += 1)
  }

  const handlePrevious = () => {
    if (currentQuestion !== 0) setCurrentQuestion((currQue) => currQue -= 1)
  }

  const handleFinishQuestions = () => {
    const userScore = questions.reduce((acc, question) => {
      return acc + (question.answer === question.userAnswer ? 1 : 0);
    }, 0);

    setScore(userScore);
    setShowQuestions(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowQuestions(true);
    setShowResults(false);
    setQuestions((prevQuestions) => prevQuestions.map((q) => ({ ...q, userAnswer: undefined })))
    setCurrentQuestion(0);
  };

  const handleOnAnswered = (answer_idx: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestion].userAnswer = answer_idx;
      return updatedQuestions;
    })
  }

  const handleGoBack = () => {
    setShowResults(false);
    setShowQuestions(true);
  }

  useEffect(() => {
    loadQuestions();
  }, [])

  return (
    <div className="min-h-screen">
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
      
      <div className="flex flex-col items-center">
        <Status
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          showForm={showForm}
        />
        {(showQuestions || showForm) && (
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

        )}
        {showResults && <ResultsDisplay
          score={score}
          totalQuestions={totalQuestions}
          name={name}
          goBack={handleGoBack}
          restart={handleRestart}
        />}
      </div>
    </div>
  );
}

export default App;
