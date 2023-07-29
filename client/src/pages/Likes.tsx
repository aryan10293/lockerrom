import React from 'react'
import { AsideLeft } from '../components/AsideLeft';
import { AsideRight } from '../components/AsideRight';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
function Likes() {
    const [user,setUser] = React.useState<User>()
    const [likedPost, setLikedPost] = React.useState<any[]>([])
    ///getUserLikedPost/:id
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
            } else {
            console.log('cool')

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    fetchData();
    }, []);
    const getUserLikes = async () => {
        try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/getUserLikedPost/${localStorage.getItem('loginUser')}/likes`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setLikedPost(data)
            } else {
            console.log('cool')

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    React.useEffect(() => {
      getUserLikes();
    }, []);   
    
    const handleLike = async (e: any) => {
        const loginUser = {
          userId: user?._id,
          name: user?.userName,
          img: user?.img
        }
        const dataset = e.currentTarget.parentElement.dataset.id
        try {
              const response = await fetch(`https://lockerroom2-0.onrender.com/${'unlike'}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({dataset, loginUser})
                })
            const data = await response.json()
        } catch (error) {
          console.log(error)
        }
           let newList = likedPost.filter(x => x !== dataset )
          setLikedPost(newList)
          getUserLikes()
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
    img: string;
    __v: number;
    }
    interface LikedItems {
    likes: any[],
    reFeats: any[],
    _id: string,
    text: string,
    date: string,
    _v: number,
    userId: string,
    userName:string,
    img: string,
    comments: any[],
    profileImg: string
    
    }
console.log(likedPost)
  return (
 <div className=" my-component flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="m-4 hidden sm:flex">
                            <h1 className="text-xl font-semi-bold">{'KingJames'}</h1>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden">
                            <Link to="/home" id="hero-logo">  </Link>
                        </header>

                        {/* create post */}

                        <>
                           


                            {/* filter posts by date and trending */}

                            <div className="flex pl-0.5 pr-0.5 sm:pr-6 sm:px-5 py-3 justify-between relative">

                                <h1 className="text-xl">Liked Post</h1>


                                {/* filter modal */}

                                
                            </div>

                            {/* Show Posts */}
                            <div className='overflow-y-auto max-h-[80vh]'>
                            {likedPost.map((item: LikedItems) => {
                                  const targetTimeString = item.date;
                                  const targetTime = new Date(targetTimeString);
                                  const currentTime = new Date();
                                  const millisecondsPassed = currentTime.getTime() - targetTime.getTime();
                                  const hoursPassed = Math.floor( millisecondsPassed / (1000 * 60 * 60));
                              return (
                                <div className="bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " key={item._id}>
                                  <div className="  items-start px-4 py-6">
                                      <div className='flex justify-between'>
                                          <div className='flex'>
                                            <img className=" inline w-12 h-12 rounded-full object-cover mr-4 shadow" src={item.profileImg} alt="avatar" />
                                            <div>
                                                <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">{item.userName}</h2>
                                                <Link to={`/profile/${item.userId}`} className="text-gray-700">@{item.userName}</Link>
                                            </div>
                                          </div>
                                          <div className="flex inline-block items-center">
                                            <small className="flex-10 text-sm text-gray-700">{hoursPassed} hours ago</small>
                                          </div>   
                                      </div>                                   
                                      <div className="">
                                        <div>
                                          <p className=" break-words mt-3 text-gray-700 text-sm">
                                              {item.text}
                                          </p>
                                        </div>
                                        <div>
                                          {item.img !== undefined ? <img className='image' src={item.img} alt={item.text} />: null}
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <div className="flex mr-2  text-white text-sm mr-3" data-id={item._id}>
                                              {item.likes.includes(user?._id) ? 
                                                <button onClick={handleLike} className="text-red-500 hover:text-gray-500 text-20" ><FontAwesomeIcon icon={faHeart} /></button>
                                              : 
                                                <button className="text-gray-500 hover:text-red-500 text-20" ><FontAwesomeIcon icon={faHeart} /></button> 
                                              }
                                              <span className='text-black'>{item.likes.length}</span>
                                            </div>
                                            <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                              <Link to={`/comments/${item._id}`}><button className="text-gray-500 hover:text-gray-1000 text-20" ><FontAwesomeIcon icon={faComment} /></button></Link>
                                              <span>   {item.comments.length}</span>
                                            </div>
                                            <div className="flex mr-2 text-gray-700 text-sm mr-4">
                                              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                                </svg>
                                              <span>Share</span>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                                </div> 
                              )
                            })

                            }
                            </div>                         

                        </>

                    </main>

                    <AsideRight />
                    {/* <a href="/afaqqf">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a> */}
                </div>
            </div>
  )
}

export default Likes
