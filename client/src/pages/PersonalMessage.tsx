import React from 'react'
import { io } from 'socket.io-client'
import { AsideLeft } from '../components/AsideLeft'
import { useParams, Link } from 'react-router-dom'
const socket = io('http://localhost:2012')
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
        const response = await fetch(`http://localhost:2012/getuser/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
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
        const response = await fetch('http://localhost:2012/checkuser', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data)
          setMessageList(data.messages)
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
          const response = await fetch(`http://localhost:2012/${user?._id}/${messaging?.userName}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data[1])
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
  }, [user]);

    React.useEffect(() => {
      //let chat = id !== undefined && user?._id !== undefined? id.slice(id.length - 4)+user?._id.slice(user._id.length - 4) : null
    const fetchData = async () => {
      if(user?._id !== undefined && messaging?.userName !== undefined){
        try {
          const response = await fetch(`http://localhost:2012/${user?._id}/${messaging?.userName}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setChat(data[0])
            socket.emit('joinRoom', data[0])
            console.log('hey does ths work')
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
        alert(data);
      };

      socket.on("receive_message", receiveMessageHandler);

      // return () => {
      //   socket.off("receive_message", receiveMessageHandler);
      // };     
    },[socket])


    const sendMessage = async (e:any) => {
      e.preventDefault()
        try {
          console.log(1,'maybe it dont work')
              await fetch(`http://localhost:2012/sendmessage/${id}`, {
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
               console.log(2,'maybe it dont work')
              socket.emit("send_message", {chat, message})
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
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
              </div>
            </div>
            <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">It was you who would bring balance to the Force</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">Not leave it in Darkness</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
              </div>
            </div>
            <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">It was you who would bring balance to the Force</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">Not leave it in Darkness</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
              </div>
            </div>
            <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">It was you who would bring balance to the Force</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">Not leave it in Darkness</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
              </div>
            </div>
            <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">It was you who would bring balance to the Force</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-bubble">Not leave it in Darkness</div>
          </div>                                
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
            })

            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PersonalMessage
