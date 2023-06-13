import React from 'react'
import { io } from 'socket.io-client'
import { AsideLeft } from '../components/AsideLeft'
import { useParams, Link } from 'react-router-dom'
const socket = io('http://localhost:2012')
function PersonalMessage() {
  const params = useParams()
  const id = params.id
  const [messaging, setMessaging] = React.useState<Messaging | null>(null)
  const [userMessagingId, setUserMessagingId] = React.useState<string>('')
  const [messagingId, setMessagingId] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
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
          setMessagingId(data[0]._id.slice(data[0]._id.length - 4))
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
          setMessageList(data.messages)
          setUserMessagingId(data._id.slice(data._id.length - 4))
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
      socket.on("receive_message", (data) => {})
    },[])

    const sendMessage = () => {
      socket.emit("send_message", {message})
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
// console.log( userMessagingId + messagingId)
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
            className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0"
          >
            <p>Open Messgages To The Right!!</p>
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
