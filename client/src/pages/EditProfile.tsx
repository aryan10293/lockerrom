import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AsideLeft } from '../components/AsideLeft'
import { AsideRight } from '../components/AsideRight'
import { Link } from 'react-router-dom'
function EditProfile() {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const [username, setUsername] = React.useState<string>('')
    const [website, setWebsite] = React.useState<string>('')
    const [bio, setBio] = React.useState<string>('')

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
            const response = await fetch('http://localhost:2012/checkuser', {
            method: 'GET',
            credentials: 'include',
            });

            if (response.ok) {
            const data = await response.json();
            setUsername(data.userName)
            setWebsite(data.websiteLink)
            setBio(data.bio)
            } else {
            console.log('cool')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    const handleClick = async (e:any) => {
      const obj = {
        username: username,
        bio: bio,
        websiteLink: website,
        profilePic: undefined
      }
      let img = e.target.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[0].files[0]
      if(img !== undefined){
        img = await convertBase64(img)
        obj.profilePic = img
      }
      try {
            const response = await fetch(`http://localhost:2012/editprofile/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({obj, id})
                })
            const data = await response.json()
            console.log(data)
            navigate(`/profile/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex justify-center px-5 sm:px-32 md:mt-4">
      <div className="flex h-screen w-screen">
          <AsideLeft />
       <div className="flex min-h-full flex-1 flex-col  px-6 py-3 lg:px-8">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit Player
            </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6" >
              <div>
                <label  className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Bio
                  </label>
                <div className="mt-2">
                  <input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    id="bio"
                    name="bio"
                    type="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                    Website Link
                  </label>
                <div className="mt-2">
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    id="link"
                    name="link"
                    type="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
                <div>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                   img
                  </label>
                <div className="mt-2">
                  <input
                    
                    id="img"
                    name="img"
                    type="file"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleClick}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
      </div>
        <AsideRight />
      </div>
    </div>
  )
}

export default EditProfile
