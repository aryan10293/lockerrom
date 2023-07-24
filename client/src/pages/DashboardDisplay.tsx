import React from 'react'
import { Link } from 'react-router-dom'
import  { Fragment, } from 'react'
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import { BsFillImageFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
function DashboarDisplay(props: any) {
    const [content,setContent] = React.useState<string>('')
    const [user,setUser] = React.useState<User>()
    const [userLikes, setUserLikes] = React.useState<string[]>([])
    const [feat, setFeat] = React.useState<any>([])
    const convertBase64 = (file: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    };



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
          setUserLikes(data[0].likes)
        } else {
          console.log('cool')

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  fetchData();
}, []);
    const loginUser = {
        userId: user?._id,
        name: user?.userName,
        img: user?.img
  }

    const renderFeats = async () => {
        try {
          const getFeats = await fetch('https://lockerroom2-0.onrender.com/renderfeats', {
            method: 'GET',
            credentials: 'include',
          });

          if (getFeats.ok) {
            const data = await getFeats.json();
            setFeat([...data].reverse());
          } else {
            console.error('Error fetching data:', getFeats.status);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  };
    React.useEffect(() => {

      renderFeats();
    }, []);


    const handleClick = async (e: any) => {
      let img = e.target.previousElementSibling.childNodes[0].files[0];
      if(img !== undefined){
        img = await convertBase64(img)
      }
      try {
        await fetch('https://lockerroom2-0.onrender.com/postfeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content,loginUser, imgUrl: img }),
        });
        setContent('');
        renderFeats();
      } catch (error) {
        console.error('Error:', error);
      }

    };


  const LikeOrUnlike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const feat = e.currentTarget.parentElement as HTMLElement;
    const dataset = feat.dataset.id;
    const action: string = userLikes?.includes(dataset || '') ? 'unlike' : 'like';
    console.log(action)
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
    renderFeats()
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
interface FeatItems {
  likes: any[],
  reFeats: any[],
  _id: string,
  text: string,
  date: string,
  _v: number,
  userId: string,
  name:string,
  img: string,
  comments: any[],
  profileImg: string
  
}
  return (
 <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="m-4 hidden sm:flex">
                            <h1 className="text-xl font-semi-bold">{user?.userName}</h1>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden">
                            <Link to="/home" id="hero-logo">  </Link>
                        </header>

                        {/* create post */}

                        <>
                            <div className="border sm:ml-3 sm:mr-0 flex px-2 py-3">

                                <div className="mt-3 w-12 h-12 text-lg flex-none">
                                    <img src={user?.img} className="flex-none w-12 h-12 rounded-full" alt="avatar" />
                                </div>

                                <div className="w-full px-4">
                                    <textarea
                                        value={content}
                                        placeholder="What's happening?"
                                        className="resize-none mt-3 pb-3 w-full h-28 bg-slate-100 focus:outline-none rounded-xl p-2"
                                        onChange={(e) => setContent(e.target.value)}
                                         >
                                    </textarea>
                                    <div className="max-w-xl max-h-80 mx-auto rounded-md">
                                        <img
                                            src={""}
                                            className={false ? "block max-w-full max-h-20 rounded-md my-2 cursor-pointer" : "hidden"}
                                            alt="avatar"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <label className="flex m-2">
                                            <input
                                                className="hidden"
                                                type="file"
                                            />
                                            <BsFillImageFill className="text-2xl mt-1 text-blue-700 cursor-pointer" />
                                        </label>
                                        <button
                                            onClick={handleClick}
                                            className="p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
                                            >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* filter posts by date and trending */}

                            <div className="flex pl-0.5 pr-0.5 sm:pr-6 sm:px-5 py-3 justify-between relative">

                                <h1 className="text-xl"> Posts</h1>

                                <GiSettingsKnobs
                                    className="fill-blue-600 stroke-0 hover:stroke-2 text-2xl cursor-pointer"
                                    >
                                </GiSettingsKnobs>

                                {/* filter modal */}

                                
                            </div>

                            {/* Show Posts */}
                            {feat.map((item: FeatItems) => {
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
                                                <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">{item.name}</h2>
                                                <Link to={`/profile/${item.userId}`} className="text-gray-700">@{item.name}</Link>
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
                                                <button className="text-red-500 hover:text-gray-500 text-20" onClick={LikeOrUnlike}><FontAwesomeIcon icon={faHeart} /></button>
                                              : 
                                                <button className="text-gray-500 hover:text-red-500 text-20" onClick={LikeOrUnlike}><FontAwesomeIcon icon={faHeart} /></button> 
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

                        </>

                    </main>

                    <AsideRight />
                    <a href="/afaqqf">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
  )
}

export default DashboarDisplay