import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Signin from './pages/Signin'
import Home from './pages/Home'
import SignUp from './pages/Signup'
import axios from 'axios'
import Chat from './pages/Chat'
import { ProviderContext } from './context/appContext'
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true
function App() {
  return (
    <>
      <ProviderContext>
        <div className='w-ful bg-bg min-h-screen'>
          <Router>
            <Toaster
              position='bottom-right' />
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/chat' exact element={<Chat />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </Router>
        </div>
      </ProviderContext>
    </>
  )
}

export default App
