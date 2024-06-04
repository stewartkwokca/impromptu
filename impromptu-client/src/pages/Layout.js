import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";
const api_url = "http://localhost:8000";

const Layout = ({user, setUser}) => {
  const [navVisible, setNavVisible] = useState(false);
  const handleLogout = async() => {
    await axios.post(`${api_url}/logout`,{}, {withCredentials: true}).then((res, err) => {
      console.log("logging out");
      setUser(null);
    })
  }
  console.log(user);
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="flex flex-row w-screen h-16 bg-black fixed top-0 left-0">
        <button onClick={()=>setNavVisible(!navVisible)} className="ml-5 cursor-pointer"><IoIosMenu size={40} color="white"/></button>
        <Link to="/" className="block mt-4 text-lg font-bold lg:inline-block text-sky-200 ml-4 cursor-pointer">
          imPROMPTu
        </Link>
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

