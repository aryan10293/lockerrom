import React from 'react'
import { Fragment } from 'react';
import { useNavigate,Link } from 'react-router-dom';
function UserToFollow(props: any) {
    const navigate = useNavigate()
    const [user,setUser] = React.useState<People | null>(null)
    const [people, setPeople] = React.useState<any[]>([])
    const [following, setFollowing] = React.useState<any[] | undefined>(user?.following)
    interface People{
        followers: any[];
        likes: any[];
        following: any[];
        events: any[];
        _id: string;
        userName: string;
        email: string;
        password: string;
        __v: number;
        img: string;
    }
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
                setFollowing(data.following)
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
    const loginUser = {
        userId: user?._id,
        name: user?.userName
    }
    React.useEffect(() => {
        const getUsers = async () => {
            try {
            const getUsers = await fetch('http://localhost:2012/getusers', {
                method: 'GET',
                credentials: 'include',
            });

            if (getUsers.ok) {
                const data = await getUsers.json();
                setPeople(data);
                //console.log(data); // Logging the fetched data
            } else {
                // Handle non-OK response (e.g., unauthorized or server error)
                console.error('Error fetching data:', getUsers.status);
            }
            } catch (error) {
            // Handle fetch errors (e.g., network error)
            console.error('Error fetching data:', error);
            }
        }
        getUsers()
    },[])
    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
            const feat = e.currentTarget.parentElement as HTMLElement;
            const dataset = feat.dataset.id;
            const action: string = following?.includes(dataset || '') ? 'unfollow' : 'follow';
            console.log(action)
            try {
                    const response = await fetch(`http://localhost:2012/${action}`, {
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

    return (
        <>
          <div className="ml-5 mt-8 mb-4 flex flex-col w-10/12 justify-around ">
            {people.map((item: People) => {
                return (
                    <>
                        {user?._id !== item._id  ? (
                            <div className="flex mb-5" key={item._id} data-id={item._id}>
                                <img
                                    src={item?.img}
                                    className="w-12 h-12 rounded-full cursor-pointer"
                                    alt={`drej`}
                                    onClick={() => navigate(`/profile/${item._id}`)} />

                                <div className="w-40 flex flex-col px-2 ">
                                    <Link to={`/profile/${item._id}`}>
                                        <h2 className="font-semibold">{item.userName}</h2>
                                        <h2> @{item.userName} </h2>
                                    </Link>
                                </div>

                                {following?.includes(item._id) ? (
                                    <button
                                    onClick={handleFollow}
                                    className="mt-1.5 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                                        Unfollow
                                    </button>
                                ): (
                                    <button
                                    onClick={handleFollow}
                                    className="mt-1.5 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                                        Follow
                                    </button>
                                )}

                            </div>
                        ) : null}
                    </> 
                )
            })}
        </div>

        </>
   )
}

export default UserToFollow
