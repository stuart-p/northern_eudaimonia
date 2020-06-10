import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import logo from "../../images/logo150.png";

const Navbar = ({ location }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [linkCss, setLinkCss] = useState("collapse navbar-collapse");
  const [navLinks, setNavLinks] = useState([
    {
      id: 1,
      path: "/",
      text: "home",
    },
    {
      id: 2,
      path: "/about",
      text: "about",
    },
    {
      id: 3,
      path: "/menu",
      text: "menu",
    },
  ]);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const navbarHandler = () => {
    if (navbarOpen) {
      setNavbarOpen(false);
      setLinkCss("collapse navbar-collapse");
    } else {
      setNavbarOpen(true);
      setLinkCss("collapse navbar-collapse show");
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-white navbar-light fixed-top">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo" height={50} width={50} />
      </Link>
      <button className="navbar-toggler" type="button" onClick={navbarHandler}>
        <span className="navbar-toggler-icon" />
      </button>
      <div className={linkCss}>
        <ul className="navbar-nav mx-auto">
          {navLinks.map(link => {
            return (
              <li key={link.id} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link text-capitalize ${
                    link.path === currentPath ? "active" : ""
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
