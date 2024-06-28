import './App.css'
import Navbar from './components/Navbar'
import Status from './components/Status'

function App() {

  const onRestart = () => {

  }

  return (
    <div className='min-h-screen'>
    <Navbar />
    <div className='flex flex-col items-center'>
      <Status currentQuestion={5} totalQuestions={8} onRestart={onRestart}/>
      {/* Add Questionnaire component here. */}
    </div>
    </div>
  )
}

export default App
