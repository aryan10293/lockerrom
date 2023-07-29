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
import { Navigate } from 'react-router-dom';
function App() {
  const [userId,setUserId] = React.useState(localStorage.getItem('loginUser')||null)
  const [user, setUser] = React.useState(null)
  let userLogin = false
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if(userId !== null){
            const response = await fetch(`https://lockerroom2-0.onrender.com/checkuser/${userId}`, {
              method: 'GET',
              credentials: 'include'
          });
          const data = await response.json();
          setUser(data)
          setUserId(localStorage.getItem('loginUser'))
        }
      } catch (error) {
      console.error(error);
      }

    }
    fetchData()
  },[])
  if(user !== null){
    userLogin = true
  }

  return (
    <Routes>
          <Route 
          path="/register"
          element={ !userLogin ? <RegisterDisplay /> : <Navigate to='/dashboard'/> } />
          {/* element={ userLogin ? <Dashboard state={user} user={userId}/> : <Navigate  to='/'/>} */}
          <Route 
          path="/"
          element={ !userLogin ? <LoginDisplay /> : <Navigate to='/dashboard'/> } />
           <Route 
          path="/dashboard"
          element={ userLogin ? <DashboardDisplay /> : <Navigate to='/'/> } />
          <Route 
          path="/profile/:id"
          element={ userLogin ? <ProfileDisplay /> : <Navigate to='/'/> } />
          <Route 
          path="/comments/:id"
          element={ userLogin ? <CommentSection /> : <Navigate to='/'/> } />
          <Route 
          path="/editprofile/:id"
          element={ userLogin ? <EditProfile /> : <Navigate to='/'/> } />
          <Route 
          path="/message"
          element={ userLogin ? <Message /> : <Navigate to='/'/> } />
          <Route 
          path="/messages/:id"
         element={ userLogin ? <PersonsalMessage /> : <Navigate to='/'/> } />
          <Route 
          path="/likes"
          element={ userLogin ? <Likes /> : <Navigate to='/'/> } />
    </Routes>
  );
}

export default App;


// <Routes>
//           <Route 
//           path="/dashboard"
//           element={ userLogin ? <Dashboard state={user} user={userId}/> : <Navigate  to='/'/>} />

//           <Route 
//            path="/cart"
//            element={userLogin ? <Cart state={user} user={userId}/> : <Navigate  to='/'/>} />
          
//           <Route 
//            path="/wishlist"
//            element={userLogin ? <Wishlist user={userId}/> : <Navigate  to='/'/>} />

//           <Route 
//           path="/product/:id"
//           element={userLogin ? <Product user={userId}/> : <Navigate  to='/'/>} />

//           <Route 
//           path='/'
//           element={!userLogin ? <Login /> : <Navigate to='/dashboard'/>} />

//           <Route 
//           path="/checkout/:oid/:tid"
//           element={userLogin ? <Checkout state={user} user={userId}/> : <Navigate  to='/'/>} />

//           <Route 
//           path='/signup'
//           element={!userLogin ? <Signup /> : <Navigate to='/dashboard'/>} />
//         </Routes>

//     </>
//   );
// }

// export default App;

          