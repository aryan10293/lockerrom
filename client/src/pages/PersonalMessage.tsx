import React from 'react'
import { io } from 'socket.io-client'
import { AsideLeft } from '../components/AsideLeft'
import { useParams, Link } from 'react-router-dom'
const socket = io('https://lockerroom2-0.onrender.com')
function PersonalMessage() {
  const params = useParams()
  const id = params.id
  const [messaging, setMessaging] = React.useState<Messaging | null>(null)
  const [user, setUser] = React.useState<Messaging | null>(null)
  const [chat,setChat] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [convo, setConvo] = React.useState<any[]>([])
  const [messageList, setMessageList] = React.useState<any[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://lockerroom2-0.onrender.com/getuser/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setMessaging(data[0]);
        } else {
          console.log('cool')
          setMessaging(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      fetchData();
    }, [id]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://lockerroom2-0.onrender.com/checkuser/${localStorage.getItem('loginUser')}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data[0])
          setMessageList(data[0].messages)
        } else {
          console.log('cool')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    React.useEffect(() => {
    const fetchData = async () => {
      if(user?._id !== undefined && messaging?.userName !== undefined){
        try {
          const response = await fetch(`https://lockerroom2-0.onrender.com/${user?._id}/${messaging?.userName}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setConvo(data[1])
            setChat(data[0])
          } else {
            console.log('cool')
          }
        } catch (error) {
          console.error('Error fetching data:', error);
      }
      }
    };

    fetchData();
  }, [user, messaging]);

  const addToConvo = async () => {
    if(user?._id !== undefined){
          try {
          const response = await fetch(`https://lockerroom2-0.onrender.com/${user?._id}/${messaging?.userName}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setConvo(data[1])
          } else {
            console.log('cool')
          }
        } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
  }

    React.useEffect(() => {
      //let chat = id !== undefined && user?._id !== undefined? id.slice(id.length - 4)+user?._id.slice(user._id.length - 4) : null
    const fetchData = async () => {
      if(user?._id !== undefined && messaging?.userName !== undefined){
        try {
          const response = await fetch(`https://lockerroom2-0.onrender.com/${user?._id}/${messaging?.userName}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setChat(data[0])
            socket.emit('joinRoom', data[0])
          } else {
            console.log('cool')
          }
        } catch (error) {
          console.error('Error fetching data:', error);
      }
      }
    };
      fetchData();

      const receiveMessageHandler = (data:any) => {
       addToConvo()
        // alert(data);
      };

      socket.on("receive_message", receiveMessageHandler);

      // return () => {
      //   socket.off("receive_message", receiveMessageHandler);
      // };     
    },[socket, user, messaging])


    const sendMessage = async (e:any) => {
      e.preventDefault()
      const idk = {
        message: message,
        sender: user?._id
      }
        try {
              await fetch(`https://lockerroom2-0.onrender.com/sendmessage/${id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                message: message,
                sender:{
                  id: user?._id,
                  name: user?.userName
                },
                receiver: {
                  id: messaging?._id,
                  name: messaging?.userName
                },
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
              })});
              socket.emit("send_message", {chat, idk})
            setMessage('')
        } catch (error) {
            console.error(error)
        }
    }


    interface Messaging {
      followers: any[];
      likes: any[];
      following: any[];
      events: any[];
      _id: string;
      userName: string;
      email: string;
      password: string;
      img: string;
      __v: number;
  }
    interface MessageList {
      id: string;
      name: string;
  }
  console.log(messageList)
  return (
    <div className=" main-chat lg:h-screen  divide-solid">
      <div className="flex  lg:h-5/6  lg:my-auto shadow-md">
        <AsideLeft />
        {/* Users online */}
        <div className="flex flex-col flex-grow lg:max-w-full bg-blue-50">
          {/* Messages */}
          <p className="font-black mt-4 mb-2 pl-4 lg:pl-8 text-2xl">
            To: {messaging?.userName.toUpperCase()} 
          </p>
          <div
            id="msg"
            className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0 scrollable-content"
          > 
            {convo.map((item: any) => (
              <div>
                  {user?._id === item[0].sender ? (
                    // Code to render when the condition is true
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt='profile img' src={user?.img} />
                          </div>
                        </div>
                        <div className="chat-bubble">{item[0].message}</div>
                      </div> 
                  ) : (
                    // Code to render when the condition is false
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt='profile img' src={messaging?.img} />
                          </div>
                        </div>
                        <div className="chat-bubble">{item[0].message}</div>
                      </div> 
                  )}
              </div>
            ))}                   
          </div>
              <form className="">
            <div className="px-8">
              <select
                className="lg:hidden text-xs flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-green-400 placeholder-gray-400 shadow-sm focus:outline-none"
                id="usersOn"
              >
                <option value="" className="">
                  Everyone
                </option>
                    {" "}
              </select>
            </div>
            <div className="w-full flex p-4 lg:p-8 bg-blue-50">
              {" "}
              <div className="flex relative w-full lg:w-5/6">
                <span className="rounded-l-md inline-flex items-center px-1 lg:px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    To: {messaging?.userName}
                </span>
                <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                  name="message"
                />
              </div>
              <div className="hidden lg:block w-1/6">
                <button
                onClick={sendMessage}
                  className="ml-8 flex-shrink-0 bg-green-400 text-gray-700 text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden lg:block pl-4 pr-4 w-64 bg-blue-600 text-white">
          <p className="font-black my-4 text-xl">
            {" "}
            Messages
          </p>
          <ul>
            {messageList.map((name:MessageList )=> {
              return (
                <Link
                to={`/messages/${name.id}`}
                >
                  <h2>{name.name}</h2>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PersonalMessage
