import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Login2 from './pages/re-login'
import Code from './pages/code'
import Add from './pages/add'
import Final from './pages/final'



export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/login/error' element={<Login2/>}/>
            <Route path='/login/auth' element={<Code/>}/>
            <Route path='/login/auth/2' element={<Add/>}/>
            <Route path='/login/auth/3' element={<Final/>}/>
            
        </Routes>
    </BrowserRouter>
  )
}