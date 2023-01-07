import "../App.css";
import {Outlet, Link} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="App-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
