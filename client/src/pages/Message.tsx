import React from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:2012')
function Message() {
    React.useEffect(() => {
    socket.on('receive_message', (data) => {
        alert(data.message)
    })
    }, [socket])
    const [message, setMessage] = React.useState<string>('')
    const sendMesage = () => {
        socket.emit('send_message', {message: message})
    }
  return (
    <div>
      <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder='enter message'/>
      <button onClick={sendMesage}>send meesage</button>
    </div>
  )
}

export default Message
