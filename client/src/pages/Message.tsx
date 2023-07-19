import React from 'react'
// import { io } from 'socket.io-client'
import { AsideLeft } from '../components/AsideLeft'
import { Link } from 'react-router-dom';
// const socket = io('http://localhost:2012')


function Message() {
    const [user,setUser] = React.useState<User | null>(null)
    const [messageList, setMessageList] = React.useState<any[]>([])
        React.useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('https://lockerroom2-0.onrender.com/checkuser', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setMessageList(data.messages)
            } else {
                console.log('cool')
                setUser(null);
            }
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    interface User {
        followers: any[];
        likes: any[];
        following: any[];
        events: any[];
        messages: any[];
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
        <div className="flex flex-col flex-grow lg:max-w-full bg-blue-50">
          {/* Messages */}
          <p className="font-black mt-4 mb-2 pl-4 lg:pl-8 text-2xl">
            Main Chat
          </p>
          <div
            id="msg"
            className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0"
          >
            <p>Open Messgages To The Right!!</p>
          </div>
          
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

export default Message;


//two buttons
    // one button is to open all messages
    // its goin to have no id parameter
    // iuf you have any open messages they will display to the right if no messages itll be nothing to the right
    // itll be clickable links right 
    // once clicked itll displat the messages between the user and clicked person

    // other message button will be on the other user profile
    // ic clicked itll jump straght to the messages between the two 
