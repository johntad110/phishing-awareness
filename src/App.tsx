import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Status from './components/Status'
import FormInput from './components/FormInput'
import ResultsDisplay from './components/ResultsDisplay'

function App() {
  const [showForm, setShowForm] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex flex-col items-center'>
        {showForm && <FormInput onStart={handleStart} />}
        {showQuestions && (
          <>
            <Status currentQuestion={5} totalQuestions={8} onRestart={handleRestart} />
            {/* Add Questionnaire component here. */}
            <h2 className='mt-8'>Questionnaire Component Placeholder</h2>
          </>
        )}
        {showResults && <ResultsDisplay />}
      </div>
    </div>
  )
}

export default App
