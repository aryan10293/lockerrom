import React from 'react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function CommentSection() {
    const params = useParams();
    const id = params.id;
    const [user, setUser] = React.useState<User>()
    const [content, setContent] = React.useState<string>('');
    const [replyingTo, setReplyingTo] = React.useState<string>('')
    const [comments, setComments] = React.useState<any[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/checkuser/${localStorage.getItem('loginUser')}`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setUser(data[0]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    fetchData();
    }, []);
    const renderComments = async () => {
      try {
          const response = await fetch(`https://lockerroom2-0.onrender.com/lol/${id}`, {
          method: 'GET',
          credentials: 'include',
          });

          if (response.ok) {
          const data = await response.json();
          setReplyingTo(data[0].name)
          console.log(data[0].comments)
          setComments(data[0].comments);
          } else {
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
     }
    React.useEffect(() => {
        renderComments()
    }, [])

    const handleClick = async () => {
        const obj = {
            comment: content,
            date: Date.now(),
            userId: user?._id,
            name: user?.userName,
            featId: id,
        };
        try {
        const response = await fetch(`https://lockerroom2-0.onrender.com/addcomment/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        });
        if (response.ok) {
            renderComments()
            setContent('')
            // Trigger a callback or update state in the parent component
        } else {
            throw new Error('Failed to retrieve comments'); // Throw an error to handle the error case
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error case here
        }
  };


console.log(comments)
  interface User {
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
  return (
    
    <div className="my-component  ml-0 sm:mr-0 sm:mx-1 pl-0 pr-1 sm:pr-0 sm:px-1 py-3 border-b">
      <div className=''>
        <div className='flex'>
            <div className="mt-3 w-12 h-12 text-lg flex-none">
            <img
              src={user?.img}
              className="flex-none w-12 h-12 rounded-full"
              alt="avatar"
            />
          </div>

          <div>
            <div className="w-full px-4 py-3 relative">
                <div className="w-full flex gap-2 justify-between">
                  <h2 className="font-semibold">
                    <span className="text-slate-600 pl-2">@{user?.userName}</span>
                  </h2>
                </div>
            </div>

            <div className="flex gap-2">
              <span className="text-slate-500">replying to</span>
              <span className="text-blue-600 font-semibold">@{replyingTo}</span>
            </div>
          </div>
        </div>

        {true ? (
          <div className="flex justify-between items-center mt-3 p-3 px-2 border-y-2 w-full focus:outline-none gap-4">
            <span className="flex-1">
              <input
                value={content}
                className="w-full p-2 rounded-[30rem] focus:outline-none bg-slate-100"
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setContent(e.target.value)}
              />
            </span>

            <button
              className="p-2 rounded-[20rem] bg-blue-600 hover:bg-blue-800 text-white shadow-md 
              hover:shadow-lg w-20"
              onClick={handleClick}
            >
              Comment
            </button>
          </div>
        ) : (
          <div className="mt-3"></div>
        )}
      </div>
          {comments.map(item => {
        return (
            <div className=" bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " >
                <div className="  items-start px-4 py-6">
                    <div className='flex justify-between'>
                        <div className='flex'>
                        <img className=" inline w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                        <div>
                            <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">{item.name}</h2>
                            <Link to={`/profile/${item.name}`} className="text-gray-700">{item.name}</Link>
                        </div>
                        </div>
                        <div className="flex inline-block items-center">
                        <small className="flex-10 text-sm text-gray-700">{item.date} hours ago</small>
                        </div>   
                    </div>                                   
                    <div className="">
                        <div>
                        <p className="mt-3 text-gray-700 text-sm">
                            {item.comment}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })}
    </div>
  )
}

export default CommentSection