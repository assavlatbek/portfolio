import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./index.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    document.body.classList.add("hiddin");
    if (menuOpen) {
      document.body.classList.add("hiddin");
    } else {
      document.body.classList.remove("hiddin");
    }
  }, [menuOpen]);

  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to={"/"}>
            <h1>PORTFOLIO</h1>
          </Link>
        </div>

        <div className={`navigation ${menuOpen ? "open" : "hide"}`}>
          <div className="action">
            <NavLink onClick={() => setMenuOpen(false)} to={"/register"}>
              Register
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to={"/login"}>
              Login
            </NavLink>
          </div>
        </div>
        <div className={menuOpen ? `open-menu menu` : `menu`}>
          <button className="menu-toggle" onClick={toggleMenu}>
            <LazyLoadImage
              width={"50px"}
              height={"50px"}
              src={
                menuOpen
                  ? `https://static.thenounproject.com/png/4984268-200.png`
                  : `https://www.svgrepo.com/show/315606/menu-left.svg`
              }
              effect="blur"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
