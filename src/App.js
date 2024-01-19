import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import ResultsPage from './pages/ResultsPage';
import ErrorPage from './pages/ErrorPage';


function App() {
  return (
    <div>
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<HomePage />} errorElement={<ErrorPage />} />
          <Route path='/students' element={<StudentsPage />} errorElement={<ErrorPage />} />
          <Route path='/courses' element={<CoursesPage />} errorElement={<ErrorPage />} /> {/* To be implemented */}
          <Route path='/results' element={<ResultsPage />} errorElement={<ErrorPage />} /> {/* To be implemented */}
        </Routes>
      </div>
      </div>
  );
}

export default App;