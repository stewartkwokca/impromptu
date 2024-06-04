import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";
const api_url = "http://localhost:8000";

const Layout = ({user, setUser}) => {
  const [navVisible, setNavVisible] = useState(false);
  const handleLogout = async() => {
    await axios.post(`${api_url}/logout`,{}, {withCredentials: true}).then((res, err) => {
      // console.log("logging out");
      setUser(null);
    })
  }
  // console.log(user);
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="flex flex-row w-screen h-16 bg-black fixed top-0 left-0 justify-between">
        <div class="flex">
          <button onClick={()=>setNavVisible(!navVisible)} className="ml-5 cursor-pointer"><IoIosMenu size={40} color="white"/></button>
          <Link to="/" className="block mt-4 text-lg font-bold lg:inline-block text-sky-200 ml-4 cursor-pointer">
            imPROMPTu
          </Link>
        </div>
        <div class="flex">
          <form class="max-w-md mx-auto my-auto">   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                  <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
          </form>
        </div>
      </div>
      <div class="flex flex-row h-screen w-screen">
        {navVisible ? 
          <nav class="items-center justify-between flex-wrap bg-black p-6 w-64 h-full fixed top-16 left-0 pb-24 pt-0">
            <div class="flex flex-col flex-grow lg:flex lg:items-left lg:w-auto w-full h-full justify-between">
              <div class="flex flex-col text-sm lg:flex-grow w-full">
                <Link to="/prompt" className="block text-lg font-bold lg:inline-block text-white hover:text-white mr-4">
                  Prompt
                </Link>
                <Link to="/scoreboard" className="block mt-2 text-lg font-bold lg:inline-block text-white hover:text-white mr-4">
                  Scoreboard
                </Link>
                <Link to="/vote" className="block mt-2 text-lg font-bold lg:inline-block text-white hover:text-white mr-4">
                  Vote
                </Link>
              </div>
              <div class="flex flex-col text-sm w-24">
                <Link to={user==null ? "/login" : "/profile"} className="float-left inline-block text-lg px-4 py-2 leading-none border rounded text-white border-sky-300 hover:border-transparent hover:text-sky-500 hover:bg-slate-200 mt-4">{user==null ? "Login": "Profile"}</Link>
                {user!=null ? <button 
                  className="text-left inline-block text-lg px-4 py-2 leading-none border rounded text-white border-sky-300 hover:border-transparent hover:text-sky-500 hover:bg-slate-200 mt-2"
                  onClick={handleLogout}
                >Logout</button>: <></>}
              </div>
            </div>
          </nav> : <></>
        }
       

        <div className={navVisible ? "w-full mt-20 ml-64": "w-full mt-20"}>
          <Outlet />
        </div>
      </div>
    </div>
   
  )
};

export default Layout;

