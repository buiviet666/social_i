
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signin from './pages/Signin/Signin'
import Menu from './components/Menu/Menu'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <>
      <main>
        <Menu />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/profile' element={<Profile />} />

          <Route index element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
