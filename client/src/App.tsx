import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
import HomeDisplay from './pages/HomeDisplay';
import DashboardDisplay from './pages/DashboardDisplay';
import ProfileDisplay from './pages/ProfileDisplay';
import { Comment } from './components/Comment';
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
          <Route 
          path="/profile/:id"
          element={ <ProfileDisplay /> } />
          <Route 
          path="/comments/:id"
          element={ <Comment /> } />
    </Routes>
  );
}

export default App;
