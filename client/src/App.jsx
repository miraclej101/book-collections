import './App.css'
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from "./contexts/authentication";
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
/*
 <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
*/
function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<LoginPage/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
