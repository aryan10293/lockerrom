import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
function ProfilePost(props: any) {
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
    
  return (
    <div className='overflow-y-auto max-h-[50vh]'>
        {props.profile.map((item: FeatItems) => {
              const targetTimeString = item.date;
              const targetTime = new Date(targetTimeString);
              const currentTime = new Date();
              const millisecondsPassed = currentTime.getTime() - targetTime.getTime();
              const hoursPassed = Math.floor( millisecondsPassed / (1000 * 60 * 60));
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
                        <small className="flex-10 text-sm text-gray-700">{hoursPassed} hours ago</small>
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
                          <button className="text-red-500 hover:text-gray-500 text-20"><FontAwesomeIcon icon={faHeart} /></button>
                          <span className='text-black'>{item.likes.length}</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-8">
                          <button className="text-grey-500  text-20"><FontAwesomeIcon icon={faComment} /></button>
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
  )
}

export default ProfilePost
