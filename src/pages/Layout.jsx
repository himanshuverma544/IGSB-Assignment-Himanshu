import { Outlet, Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import SmartNavLink from "../components/SmartNavLink";

import { TASK, SOURCE_CODE, DEVELOPER, COMPANY } from "../utils/constants";


const Layout = () => {

  return (
    <>
      <header>
        <nav className="app-navbar">
          <ul>
            <SmartNavLink
              path={TASK.pathname}
              title={TASK.title}
            />     
            <SmartNavLink
              className="source-code"
              path={SOURCE_CODE.pathname}
              title={SOURCE_CODE.title}
              target="_blank"
            />       
          </ul>
        </nav>
      </header>

      <main>
        <Outlet/>
        <ToastContainer position="bottom-left"/>
      </main>
    
      <footer>
        <p>
          <Link
            to={COMPANY.pathname}
            target="_blank"
          >
            {COMPANY.name}
          </Link>
          company assignment completed by     
          <Link
            to={DEVELOPER.pathname}
            target="_blank"
          >
            {DEVELOPER.name}
          </Link>
        </p>
      </footer>
    </>
  );
}

export default Layout;