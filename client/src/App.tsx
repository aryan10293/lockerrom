import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment } from 'react';
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
function App() {
  return (
    <Routes>
          <Route 
          path="/register"
          element={ <RegisterDisplay /> } />
          <Route 
          path="/login"
          element={ <LoginDisplay /> } />
    </Routes>
  );
}

export default App;
