import React from 'react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { AsideLeft } from '../components/AsideLeft'
function EditProfile() {
    const params = useParams()
    const id = params.id
    const [user, setUser] = React.useState<User | null>(null)
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
            console.log('cool')
            setUser(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
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
  return (
    <div className="flex h-screen w-screen">
        <AsideLeft />
      <div>EditProfile</div>
    </div>
  )
}

export default EditProfile
