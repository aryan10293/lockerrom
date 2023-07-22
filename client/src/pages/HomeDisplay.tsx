import React from 'react'
import { Link } from 'react-router-dom'
function HomeDisplay() {
  return (
    <div className='my-component'>
        <h1>Welcome To The Locker Room</h1>
        <p><Link to='/login'>Login</Link> or <Link to='/register'>Sign Up</Link></p>
    </div>
  )
}

export default HomeDisplay
