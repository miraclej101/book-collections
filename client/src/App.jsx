import './App.css'
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from "./contexts/authentication";
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollectionPage from './pages/CollectionPage';
import BookPage from './pages/BookPage';
import AddBookPage from './pages/AddBookPage';

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
          <Route path="/collection" element={<CollectionPage/>} />
          <Route path="/collection/update/:bookId" element={<BookPage />} />
          <Route path="/collection/add" element={<AddBookPage />} />
          <Route path="*" element={<LoginPage/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
