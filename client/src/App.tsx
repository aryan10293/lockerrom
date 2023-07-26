import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
import DashboardDisplay from './pages/DashboardDisplay';
import ProfileDisplay from './pages/ProfileDisplay';
import CommentSection from './pages/CommentSection';
import EditProfile from './pages/EditProfile';
import Message from './pages/Message';
import PersonsalMessage from './pages/PersonalMessage';
import Likes from './pages/Likes';
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
          path="/"
          element={ <LoginDisplay /> } />
          <Route 
          path="/profile/:id"
          element={ <ProfileDisplay /> } />
          <Route 
          path="/comments/:id"
          element={ <CommentSection /> } />
          <Route 
          path="/editprofile/:id"
          element={ <EditProfile /> } />
          <Route 
          path="/message"
          element={ <Message /> } />
          <Route 
          path="/messages/:id"
          element={ <PersonsalMessage /> } />
          <Route 
          path="/likes"
          element={ <Likes /> } />
    </Routes>
  );
}

export default App;
