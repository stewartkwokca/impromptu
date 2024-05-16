import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
          <li>
            <Link to="/vote">Vote</Link>
          </li>
          <li>
            <Link to="/prompt">Prompt</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

