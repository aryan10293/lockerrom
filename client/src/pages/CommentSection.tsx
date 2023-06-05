import React from 'react'
import { Fragment } from 'react'
import  Comment  from '../components/Comment'
import DisplayComments from '../components/DisplayComments'
function CommentSection() {
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
  return (
    <>
        <Comment />
        <DisplayComments />
    </>
  )
}

export default CommentSection