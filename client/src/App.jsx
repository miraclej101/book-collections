import './App.css'
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from "./contexts/authentication";
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyCollectionPage from './pages/MyCollectionPage';
/*
 <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
*/
function App() {
  return (
    <div className='d-block'>
      <BrowserRouter>
        <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/collection" element={<MyCollectionPage/>} />
          <Route path="*" element={<LoginPage/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
