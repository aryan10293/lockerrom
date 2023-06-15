import React from 'react'
import {Link, useParams} from "react-router-dom"
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import ProfilePost from '../components/ProfilePost'
function ProfileDisplay() {
    const params = useParams()
    const id = params.id
    const [user, setUser] = React.useState<User | null>(null)
    const [profile, setProfile] = React.useState<User | null>(null)
    const [messagingId, setMessagingId] = React.useState<string>('')
    const [userMessagingId, setUserMessagingId] = React.useState<string>('')
    const [profilePost, setProfilePost] = React.useState<any[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2012/checkuser', {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setUserMessagingId(data._id.slice(data._id.length - 4))
            setUser(data);
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
        React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:2012/profilepost/${id}`, {
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

        fetchData();
    }, [id]);
// fetch users profile post

    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:2012/profile/${id}`, {
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
             await fetch(`http://localhost:2012/addtomessages/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: user?._id, userName: user?.userName, messagingName: profile?.userName,roomId: messagingId+userMessagingId})
            });
        } catch (error) {
            console.error(error)
        }
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
                                        ) : ( user?.following.includes(profile?._id)) ? (
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
                                    <ProfilePost profile={profilePost}/>
                                

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
                                    // <FollowInfoModal
                                    //     currentUser={currentUser}
                                    //     followersInfoModal={followersInfoModal}
                                    //     showFollowing={showFollowing}
                                    //     setFollowersInfoModal={setFollowersInfoModal}
                                    // />
                                    // <EditProfileModal currentUser={authUser} showUpdateProfile={showUpdateProfile} setShowUpdateProfile={setShowUpdateProfile} />
                                    // {sortedPosts.map(post => <Post key={post._id} post={post} />)}
                                    // <Loader show={upLoadingPhoto} />