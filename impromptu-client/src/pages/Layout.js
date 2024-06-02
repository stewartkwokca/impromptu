import { Outlet, Link } from "react-router-dom";

const Layout = ({user}) => {
  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-sky-800 p-6 mb-10">
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <Link to="/prompt" class="block mt-4 text-lg font-bold lg:inline-block lg:mt-0 text-sky-300 hover:text-white mr-4">
              Prompt
            </Link>
            <Link to="/scoreboard" class="block mt-4 text-lg font-bold lg:inline-block lg:mt-0 text-sky-300 hover:text-white mr-4">
              Scoreboard
            </Link>
            <Link to="/vote" class="block mt-4 text-lg font-bold lg:inline-block lg:mt-0 text-sky-300 hover:text-white">
              Vote
            </Link>
          </div>
          <div>

            <Link to={user==null ? "/login" : "/profile"} class="inline-block text-lg px-4 py-2 leading-none border rounded text-white border-sky-300 hover:border-transparent hover:text-sky-500 hover:bg-slate-200 mt-4 lg:mt-0">{user==null ? "Login": "Profile"}</Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

