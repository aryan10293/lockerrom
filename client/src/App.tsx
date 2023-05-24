import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment } from 'react';
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
import HomeDisplay from './pages/HomeDisplay';
import DashboardDisplay from './pages/DashboardDisplay';
function App() {
  interface User {
     followers: any[],
     likes: any[],
     following: any[],
     events: any[]
     _id: string,
     userName: string,
     email: string,
     password: string,
     __v: number
}
  const [user,setUser] = React.useState<User | null>(null)

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:2012/checkuser', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUser(data);
      } else {
        // Handle non-OK response (e.g., unauthorized or server error)
        // You can choose to set the user state to null or handle it differently
        console.log('cool')
        setUser(null);
      }
    } catch (error) {
      // Handle fetch errors (e.g., network error)
      // You can display an error message or handle it as needed
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
  return (
    <Routes>
          <Route 
          path="/register"
          element={ <RegisterDisplay /> } />
          <Route 
          path="/dashboard"
          element={ <DashboardDisplay lol={user}/> } />
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
