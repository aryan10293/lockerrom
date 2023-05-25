import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment } from 'react';
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
import HomeDisplay from './pages/HomeDisplay';
import DashboardDisplay from './pages/DashboardDisplay';
function App() {

  return (
    <Routes>
          <Route 
          path="/register"
          element={ <RegisterDisplay /> } />
          <Route 
          path="/dashboard"
          element={ <DashboardDisplay /> } />
          <Route 
          path="/login"
          element={ <LoginDisplay /> } />
           <Route 
          path="/"
          element={ <HomeDisplay /> } />
    </Routes>
  );
}

export default App;
