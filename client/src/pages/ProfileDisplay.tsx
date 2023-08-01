import React from 'react'
import {Link, useParams} from "react-router-dom"
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import ProfilePost from '../components/ProfilePost'
function ProfileDisplay() {
    const params = useParams()
    const id = params.id || ''
    const [user, setUser] = React.useState<User | null>(null)
    const [profile, setProfile] = React.useState<User | null>(null)
    const [messagingId, setMessagingId] = React.useState<string>('')
    const [userMessagingId, setUserMessagingId] = React.useState<string>('')
    const [profilePost, setProfilePost] = React.useState<any[]>([])
    const [userLikes, setUserLikes] = React.useState<string[]>([])
    const [following, setFollowing] = React.useState<any[]>([])
    const [isFollowing, setIsFollowing] = React.useState<boolean>()
    let userTrue = false;
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser !== null) {
    userTrue = true; // Assuming item.likes is an array of strings.
    }
    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/checkuser/${localStorage.getItem('loginUser')}`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setUserMessagingId(data[0]._id.slice(data[0]._id.length - 4))
            setUser(data[0]);
            setUserLikes(data[0].likes)
            setFollowing(data[0].following)
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
// fetch users profile post
        const renderPosr = async () => {
        try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/profilepost/${id}`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setProfilePost(data);
            } else {
            console.log('cool')
            setProfilePost([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        React.useEffect(() => {
        renderPosr();
    }, [id]);
// fetch users profile post

    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/profile/${id}`, {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setMessagingId(data._id.slice(data._id.length - 4))
            setProfile(data);
            } else {
            console.log('cool')
            setUser(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [id]);

    const addToMessages = async(e:any) => {
        try {
             await fetch(`https://lockerroom2-0.onrender.com/addtomessages/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: user?._id, userName: user?.userName, messagingName: profile?.userName,roomId: messagingId+userMessagingId})
            });
        } catch (error) {
            console.error(error)
        }
    }
    const handleFollow = async () => {
                const dataset = id;
                const action: string = following?.includes(dataset || '') ? 'unfollow' : 'follow';
                const loginUser = {
                    userId: user?._id,
                    name: user?.userName,
                    img: user?.img
                } 
                console.log(action)
                try {
                        const response = await fetch(`https://lockerroom2-0.onrender.com/${action}`, {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({dataset, loginUser})
                            })
                        const data = await response.json()
                        console.log(data)
                    } catch (error) {
                        console.log(error)
                    }
                    console.log(action)
                if(action === 'follow'){
                if (dataset && following) {
                    setFollowing([...following, dataset]);
                }
                } else {
                let newList = following?.filter(x => x !== dataset )
                setFollowing(newList)
                }
        }
          React.useEffect(() => {
            setIsFollowing(user?.following.includes(id));
        }, [user?.following, id]);
    const LikeOrUnlike = async (e: React.MouseEvent<HTMLButtonElement>) => {
      const loginUser = {
        userId: user?._id,
        name: user?.userName,
        img: user?.img
      }  
  const feat = e.currentTarget.parentElement as HTMLElement;
    const dataset = feat.dataset.id;
    const action: string = userLikes?.includes(dataset || '') ? 'unlike' : 'like';
    console.log(userLikes, dataset)
      try {
            const response = await fetch(`https://lockerroom2-0.onrender.com/${action}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({dataset, loginUser})
                })
            const data = await response.json()
            
        } catch (error) {
            console.log(error)
        }
        console.log(action)
    if(action === 'like'){
      if (dataset) {
        setUserLikes([...userLikes, dataset]);
      }
    } else {
      let newList = userLikes.filter(x => x !== dataset )
      setUserLikes(newList)
    }
     renderPosr()
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
        img: string
        bio: string
        websiteLink: string
    }
      interface FeatItems {
        likes: string[],
        comments: string[]
        reFeats: any[],
        _id: string,
        text: string,
        date: string,
        _v: number,
        userId: string,
        userName:string,
        profileImg: string,
    } 
  return  (
        <div>

            <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="hidden sm:flex m-4 w-full justify-between">
                            <h1 className="text-xl">Profile</h1>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden justify-between">
                            <Link to="/dashboard" id="hero-logo"> Locker Room </Link>
                        </header>

                        {false ? (
                            <div className="z-20">
                                
                            </div>
                        ) : (

                            <div className="sm:ml-5 my-6 flex flex-col space-between">

                                <div className="flex mx-auto gap-8">

                                    <img src={profile?.img} className="w-32 h-32 rounded-full" alt="avatar" />

                                    <div className="flex flex-col mt-2">

                                        <h2 className="font-semibold">{profile?.userName}</h2>

                                        <h2> @{profile?.userName} </h2>

                                        {user?._id === profile?._id ? 
                                        (<Link to={`/editprofile/${user?._id}`}><button
                                            className="border my-3 p-1 rounded-lg text-x cursor-pointer text-center font-semibold text-slate-600 bg-slate-200 hover:bg-slate-100" >
                                            Edit Profile
                                        </button> </Link>
                                        ) : ( isFollowing) ? (
                                        <div>
                                            <button
                                                className="mr-8 mt-4 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                                                Unfollow
                                            </button>
                                            <button className="mr-8 mt-4 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                                                <Link
                                                onClick={addToMessages}
                                                    to={`/messages/${profile?._id}`}>
                                                    Message
                                                </Link>
                                            </button>
                                        </div> 
                                        ) : (
                                        <div>
                                            <button
                                                onClick={handleFollow}
                                                className="mr-8 mt-4 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                                                Follow
                                            </button>
                                        </div>
                                        )}

                                        {/* Modal for Edit Profile */}

                                    

                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col items-center">
                                    <h2 className="font-semibold">{profile?.bio}</h2>
                                    {profile?.websiteLink !== undefined ? (
                                    <Link to={profile?.websiteLink} className="font-semibold text-blue-600">{profile?.websiteLink}</Link>
                                    ) : null}
                                </div>

                                <div className="flex gap-6 pl-4 mt-4 mb-16 justify-items-center mx-auto">


                                    <h3 className="text-base sm:text-xl cursor-pointer">
                                        {profilePost?.length}
                                        <span className="text-slate-600 text-base sm:text-xl"> posts
                                        </span>
                                    </h3>

                                    <h3
                                        className="text-base sm:text-xl cursor-pointer">
                                        {profile?.following.length}
                                        <span className="text-slate-600 pl-1">
                                            following
                                        </span>
                                    </h3>

                                    <h3
                                        className="text-base sm:text-xl cursor-pointer">
                                        {profile?.followers.length}
                                        <span className="text-slate-600 pl-1">
                                            followers
                                        </span>
                                    </h3>

                                </div>

                                <h1 className="text-2xl text-center mb-6">Your Posts</h1>
                                    <div className='overflow-y-auto max-h-[50vh]'>
        {profilePost.reverse().map((item: FeatItems) => {
            let timeElasped: string = 'lol'
            const targetTimeString = item.date;
            const targetTime = new Date(targetTimeString);
            const currentTime = new Date();
            const millisecondsPassed = currentTime.getTime() - targetTime.getTime();
            const secondsPassed = Math.floor(millisecondsPassed / 1000);
            const minutesPassed = Math.floor(secondsPassed / 60);
            const hoursPassed = Math.floor(minutesPassed / 60);
            const daysPassed = Math.floor(hoursPassed / 24);
            const weeksPassed = Math.floor(daysPassed / 7);

            const monthsPassed = Math.floor(daysPassed / 30.44);

            const yearsPassed = Math.floor(daysPassed / 365.25);
            console.log(hoursPassed)
            if(monthsPassed >= 12){
            timeElasped = `${yearsPassed} years ago`
            //timeElasped = `${minutesPassed} Minutes Ago`
            } else if(weeksPassed >= 4){
            timeElasped = `${monthsPassed} Months Ago`
            //timeElasped = `${hoursPassed} Hours Ago`
            } else if(daysPassed >= 7){
            timeElasped = `${weeksPassed} Weeks Ago`
            //timeElasped = `${daysPassed} Days Ago`
            } else if(hoursPassed >= 24){
            timeElasped = `${daysPassed} days Ago`
            } else if(minutesPassed >= 60){
            timeElasped = `${hoursPassed} Hours Ago`
            } else if(secondsPassed >= 60){
            timeElasped = `${minutesPassed} Minutes ago`
            } else {
            timeElasped = `${secondsPassed + 3} Seconda ago`
            }
          return (
            <div className=" bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " key={item._id}>
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
                        <small className="flex-10 text-sm text-gray-700">{timeElasped}</small>
                      </div>   
                  </div>                                   
                  <div className="">
                    <div>
                      <p className="mt-3 text-gray-700 text-sm">
                          {item.text}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                        <div className="flex mr-2  text-white text-sm mr-3" data-id={item._id}> 
                            {loginUser !== null && item.likes.includes(loginUser) ? 
                          <button className="text-red-500 hover:text-gray-500 text-20" onClick={LikeOrUnlike}><FontAwesomeIcon icon={faHeart} /></button>
                        : 
                          <button className="text-gray-500 hover:text-red-500 text-20" onClick={LikeOrUnlike}><FontAwesomeIcon icon={faHeart} /></button> 
                        }
                          <span className='text-black'>{item.likes.length}</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-8">
                          <Link to={`/comments/${item._id}`}><button className="text-grey-500  text-20"><FontAwesomeIcon icon={faComment} /></button></Link>
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
                                

                            </div>
                        )}
                    </main>

                    <AsideRight />
                </div>
            </div>
        </div>
    )
}

export default ProfileDisplay