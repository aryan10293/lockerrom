import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Fragment } from 'react'
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import { BsFillImageFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineArrowUp } from "react-icons/ai";
function DashboarDisplay(props: any) {
    // const location = useLocation()
    // const prop1 = location.state.prop1
    // console.log(prop1)
    const [content,setContent] = React.useState<string>('')
    const [feat, setFeat] = React.useState<any>([])
    // this is to pass data to the backend when user makes a post
    const loginUser = {
        userId: props.lol._id,
        name: props.lol.userName
  }
  // created to get data from the database so we can render post to user
    const renderFeats = async () => {
    try {
      const getFeats = await fetch('http://localhost:2012/renderfeats', {
        method: 'GET',
        credentials: 'include',
      });

      if (getFeats.ok) {
        const data = await getFeats.json();
        setFeat(data);
        console.log(data); // Logging the fetched data
      } else {
        // Handle non-OK response (e.g., unauthorized or server error)
        console.error('Error fetching data:', getFeats.status);
      }
    } catch (error) {
      // Handle fetch errors (e.g., network error)
      console.error('Error fetching data:', error);
    }
  };
React.useEffect(() => {

  renderFeats();
}, []);

  // forgot what this is for probably why you should make comments
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
  const handleClick = async () => {
            await fetch('http://localhost:2012/postfeat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content, loginUser})
        })
        setContent('')
        renderFeats()
  }
  return (
 <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="m-4 hidden sm:flex">
                            <h1 className="text-xl font-semi-bold">{props.lol.userName}</h1>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden">
                            <Link to="/home" id="hero-logo">  </Link>
                        </header>

                        {/* create post */}

                        <>
                            <div className="border sm:ml-3 sm:mr-0 flex px-2 py-3">

                                <div className="mt-3 w-12 h-12 text-lg flex-none">
                                    <img src='' className="flex-none w-12 h-12 rounded-full" alt="avatar" />
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


                        </>

                    </main>

                    <AsideRight />
                    <a href="#">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
  )
}

export default DashboarDisplay
                            // {isLoading ? (
                            //     <div className="z-20">
                            //         <Loader show={isLoading} />
                            //     </div>
                            // ) : (
                            //     !sortedPosts.length ?
                            //         <h1 className="text-2xl font-bold text-center mt-8">No Posts, Add one!</h1> :
                            //         sortedPosts?.map(post => <Post key={post._id} post={post} />
                            //         )
                            // )}
                                //                             <div className="w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold absolute right-11 top-4 z-20 rounded-xl">
                                //     <ul className="p-2 cursor-pointer text-start">
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Latest</li>
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Oldest</li>
                                //         <li className="p-1 hover:bg-slate-200 rounded" >Trending</li>
                                //     </ul>
                                // </div>