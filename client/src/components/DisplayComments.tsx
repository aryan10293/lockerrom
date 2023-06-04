import React from 'react'
import { Link, useParams } from 'react-router-dom'
function DisplayComments(props: any) {
    const params = useParams()
    const id = params.id
    const [comments, setComments] = React.useState<any[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:2012/lol/${id}`, {
                method: 'GET',
                credentials: 'include',
                });

                if (response.ok) {
                const data = await response.json();
                setComments(data);
                } else {
                setComments([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [id])
    console.log(comments)
    return (
                <div className=" bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl " >
                    <div className="  items-start px-4 py-6">
                        <div className='flex justify-between'>
                            <div className='flex'>
                            <img className=" inline w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                            <div>
                                <h2 className="flex-1 text-lg font-semibold text-gray-900 -mt-1">drej</h2>
                                <Link to={`/profile/${props.user.userName}`} className="text-gray-700">{props.user.userName}</Link>
                            </div>
                            </div>
                            <div className="flex inline-block items-center">
                            <small className="flex-10 text-sm text-gray-700">{10} hours ago</small>
                            </div>   
                        </div>                                   
                        <div className="">
                        <div>
                            <p className="mt-3 text-gray-700 text-sm">
                                {'lol'}
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
  )
}

export default DisplayComments
