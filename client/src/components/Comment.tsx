import React from "react";
import { useParams, Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

export const Comment = () => {
    const params = useParams()
    const id = params.id
    const [comment,setComment] = React.useState<string>('')
    const [user,setUser] = React.useState<User | null>(null)
    const [postComment,setPostComment] = React.useState<User | null>(null)
    // things i need foe this page to workl
    // kleep state of what the user is typing as a comment//
    // need data on the post i clicked on 
    // odviously need the login user data
    // need to render comments 
    // delete comments
    // 
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
    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:2012/getpost/${id}`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setPostComment(data);
            } else {
            setUser(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    fetchData();
    }, []);

    const loginUser = {
        userId: user?._id,
        name: user?.userName
  }
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
console.log(user)
console.log(postComment)
    return (
        <div className="flex ml-0 sm:mr-0 sm:mx-1 pl-0 pr-1 sm:pr-0 sm:px-1 py-3 border-b">

            <div className="mt-3 w-12 h-12 text-lg flex-none">
                <img src={'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'} className="flex-none w-12 h-12 rounded-full" alt="avatar" />
            </div>

            <div className="w-full px-4 py-3 relative">

                <div className="w-full flex gap-2 justify-between">
                    <h2 className="font-semibold">
                        {`dfej` }
                        <span className="text-slate-600 pl-2">
                            @{'drej'}
                        </span>
                    </h2>

                    {true && <HiDotsHorizontal className="cursor-pointer pr2" /> }
                </div>

                <div className="flex gap-2">
                    <span className="text-slate-500">
                        replying to
                    </span>
                    <span className="text-blue-600 font-semibold">
                        @{'lebron'}
                    </span>
                </div>

                {true ? 
                (
                    <div className="flex justify-between items-center mt-3 p-3 px-2 border-y-2 w-full focus:outline-none gap-4">

                        <span className="flex-1">
                            <input
                                value={comment}
                                className="w-full p-2 rounded-[30rem] focus:outline-none bg-slate-100"
                                type="text"
                                placeholder="Add a comment..."
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </span>

                        <button
                            className="p-2 rounded-[20rem] bg-blue-600 hover:bg-blue-800 text-white shadow-md 
                            hover:shadow-lg w-20"
                            
                            > Cancel
                        </button>

                        <button
                            className="p-2 rounded-[20rem] bg-blue-600 hover:bg-blue-800 text-white shadow-md 
                            hover:shadow-lg w-20"
                            
                            > Update
                        </button>

                    </div>
                ) : (
                    <div className="mt-3"></div>
                )}


                {/* Edit and Delete Comment Modal */}

            </div>
        </div>
    )
};

                // <div className=" bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " >
                //     <div className="  items-start px-4 py-6">
                //         <div className='flex justify-between'>
                //             <div className='flex'>
                //             <img className=" inline w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                //             <div>
                //                 <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">drej</h2>
                //                 <Link to={`/profile/${'drej'}`} className="text-gray-700">@drej</Link>
                //             </div>
                //             </div>
                //             <div className="flex inline-block items-center">
                //             <small className="flex-10 text-sm text-gray-700">{10} hours ago</small>
                //             </div>   
                //         </div>                                   
                //         <div className="">
                //         <div>
                //             <p className="mt-3 text-gray-700 text-sm">
                //                 {'lol'}
                //             </p>
                //         </div>
                //         </div>
                //     </div>
                // </div>