
import React from 'react';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const params = useParams();
  const id = params.id;
  const [content, setContent] = React.useState<string>('');
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2012/checkuser', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    const obj = {
      comment: content,
      date: Date.now(),
      userId: user?._id,
      name: user?.userName,
      featId: id,
    };
    try {
      const response = await fetch(`http://localhost:2012/addcomment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        console.log('maybe worked');
        // Trigger a callback or update state in the parent component
      } else {
        throw new Error('Failed to retrieve comments'); // Throw an error to handle the error case
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error case here
    }
  };

  interface User {
    followers: any[];
    likes: any[];
    following: any[];
    events: any[];
    _id: string;
    userName: string;
    email: string;
    password: string;
    __v: number;
  }

  return (
    <div className="flex ml-0 sm:mr-0 sm:mx-1 pl-0 pr-1 sm:pr-0 sm:px-1 py-3 border-b">
      <div className="mt-3 w-12 h-12 text-lg flex-none">
        <img
          src={
            'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
          }
          className="flex-none w-12 h-12 rounded-full"
          alt="avatar"
        />
      </div>

      <div className="w-full px-4 py-3 relative">
        <div className="w-full flex gap-2 justify-between">
          <h2 className="font-semibold">
            {`dfej`}
            <span className="text-slate-600 pl-2">@{'drej'}</span>
          </h2>
        </div>

        <div className="flex gap-2">
          <span className="text-slate-500">replying to</span>
          <span className="text-blue-600 font-semibold">@{'lebron'}</span>
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

        {/* Edit and Delete Comment Modal */}
      </div>
    </div>
  );
};

export default Comment;

