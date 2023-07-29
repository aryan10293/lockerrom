import React from 'react'
import { Fragment, ChangeEvent, FormEvent} from 'react'
import { Link } from 'react-router-dom';
export {};
function Register() {
    const [email, setEmail] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleClick = async(e: FormEvent<HTMLFormElement>) => {
       e.preventDefault()
        try {
        const reg = await fetch('https://lockerroom2-0.onrender.com/createaccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            userName: name,
            email: email,
            password: password,
            confirmPassword: password
          }),
        })
        const data = await reg.json()
        console.log(data)
        setPassword('')
        setEmail('')
        setName('')
        window.location.href = "/"
        } catch(err) {
            console.error(err)
        }
    }
  return (
 <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-component">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://i.pinimg.com/originals/23/7d/5e/237d5e9a307376d26796ed4446fc1dcb.jpg"
            alt="Locker Room"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Unleash Your Athlete Network: Join Locker Room and Experience the Power of Team Connections!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleClick}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChangeName}
                  value={name}
                  id="username"
                  name="username"
                  type="name"
                  required
                  className="my-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={handleChangeEmail}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" my-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              <div className="mt-2">
                <input
                  onChange={handleChangePassword}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="my-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              type='submit'
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
