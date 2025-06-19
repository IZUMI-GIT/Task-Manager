import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { BoardList } from './features/board/BoardList'

function App() {
  
  return(
    <>
      <BoardList />
        <BrowserRouter>
          {/* <Routes> */}
            {/* <Route path='/' element={<Home />} />
            <Route path='/sigin' element={<SignIn />} />
            <Route path='/sigout' element={<Signout />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes> */}
        </BrowserRouter>
    </>
  )
}

export default App
