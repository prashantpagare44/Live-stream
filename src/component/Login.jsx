import React , { useState } from 'react'
import Dashboard from './Dashboard.jsx'
import {useNavigate} from 'react-router-dom'

const Login = ()=>{

    const [ loginType , setLoginType ] = useState('email')
    const navigate = useNavigate()

    const handleSubmit= ()=>{
          navigate('/dashboard')
    }

    return(
        <>
           <div className=" min-h-screen bg-gray-900 flex flex-col items-center pt-4 sm:pt-20 text-white">
              <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center px-4  border-b border-gray-700">
                <div className="flex items-center text-xl font-bold">
                   <span className="text-3xl text-red-600 mr-2">📹</span> 
                   <span className="text-white">LiveStream Detect</span>
                 </div>
              </header>
              <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg  mt-10 sm:mt-16 border-t-4 border-red-300">
                <h2 className="text-3xl font-semibold mb-1 text-center">Sign in</h2>
                <p className="text-gray-400 mb-6 text-center">to continue to your Dashboard</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                   <div className="flex space-x-2 mb-6 p-1 bg-gray-900 rounded-lg">
                     <button type="button" onClick = { ()=>{
                               setLoginType('email') 
                     }} className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                                loginType === 'mobile' 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'bg-gray-900 text-gray-400 hover:bg-green-700'
                            }`}>
                      {loginType === 'mobile' ? 'Mobile' : 'Use Mobile'}

                     </button>
                     </div>
                       <div className="relative">
                        <input
                            type={loginType === 'email' ? 'email' : 'tel'} 
                            placeholder={loginType === 'email' ? 'Email Address' : 'Mobile Number'}
                            required
                            className="w-full px-4 py-3 bg-gray-900   rounded-md focus:outline-none   text-white placeholder-gray-500 transition-colors"
                        />
                    </div>
                    
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-3 bg-gray-900  rounded-md focus:outline-none   text-white placeholder-gray-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-lg  focus:outline-none "
                    >
                        Login
                    </button>
                   
                </form>
                <div className="mt-6 flex justify-center space-x-4 text-sm">
                    <a onClick={() => navigate("/forget")} href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        Forgot Password?
                    </a>
                    <span className="text-gray-600">|</span>
                    <a onClick={() => navigate("/")} href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        Register Account
                    </a>
                </div>
                </div>

           

              <footer className="mt-10 mb-4 text-xs text-blue-900">
                &copy; {new Date().getFullYear()} LiveStream Detect. All rights reserved.
            </footer>
           </div>
        </>
    )

}

export default Login