import './App.css'
import Navbar from './components/Navbar'
import Results from './components/Results'

function App() {

  return (
    <div className='min-h-screen'>
    <Navbar />
    <div className='flex flex-col items-center'>
      <Results />
      {/* Add Questionnaire component here. */}
    </div>
    </div>
  )
}

export default App
